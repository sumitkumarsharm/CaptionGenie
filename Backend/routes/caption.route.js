const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middlewares/auth.middleware.js");
const Caption = require("../models/caption.model.js");

// dynamic import for node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Gemini API endpoint
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/**
 * Generate caption using Gemini API
 */
async function generateCaption(language, imagePath) {
  try {
    console.log("📸 Sending image buffer to Gemini...");

    const imgBuffer = fs.readFileSync(
      path.join(__dirname, "..", imagePath.replace("/uploads/", "uploads/"))
    );
    const imgBase64 = imgBuffer.toString("base64");

    console.log("Gemini API URL:", GEMINI_API_URL);
    console.log("Gemini API Key present?:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

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
                inlineData: {
                  mimeType: "image/jpeg", // works for jpg/png
                  data: imgBase64,
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
    if (!req.file) return res.status(400).json({ msg: "No image provided" });

    const { language = "en" } = req.body;
    const imagePath = "/uploads/" + req.file.filename;

    const captionText = await generateCaption(language, imagePath);
    console.log("✅ Generated caption:", captionText);

    const caption = new Caption({
      user: req.user.id,
      imagePath,
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

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(item.imagePath)
    );
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await item.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
