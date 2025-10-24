const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const auth = require("../middlewares/auth.middleware.js");
const Caption = require("../models/caption.model.js");

// dynamic import for node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// 1. Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Multer storage (Cloudinary)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "captionai_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});
const upload = multer({ storage });

/**
 * Generate caption using Gemini API from a Cloudinary image URL
 */
async function generateCaption(language, imageUrl) {
  try {
    console.log("📸 Sending Cloudinary image URL to Gemini...");

    const response = await fetch(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a descriptive caption in ${language}.`,
              },
              {
                // Gemini supports URL for hosted images
                inlineData: {
                  mimeType: "image/jpeg",
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      }),
    });

    console.log("Gemini API response status:", response.status);
    const raw = await response.text();
    console.log("Gemini API raw response:", raw);

    if (!response.ok) {
      return "Error generating caption (bad response).";
    }

    const data = JSON.parse(raw);
    let caption =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate caption.";
    return caption;
  } catch (err) {
    console.error("Caption generation error:", err);
    return "Error generating caption.";
  }
}

// 📌 create caption
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ msg: "No image provided" });

    const { language = "en" } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL

    const captionText = await generateCaption(language, imageUrl);
    console.log("✅ Generated caption:", captionText);

    const caption = new Caption({
      user: req.user.id,
      imagePath: imageUrl,
      caption: captionText,
      language,
    });

    await caption.save();
    res.status(201).json(caption);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).send("Server error");
  }
});

// 📌 get all captions
router.get("/", auth, async (req, res) => {
  try {
    const items = await Caption.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// 📌 delete caption
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Caption.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Not found" });
    if (item.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    // No need to delete Cloudinary file unless you want
    await item.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
