const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Gemini API endpoint
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const generateCaption = async (language, imageUrl) => {
  try {
    console.log("📸 Fetching image from Cloudinary...");

    // Fetch image from Cloudinary URL
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imgBase64 = buffer.toString("base64");

    // detect mime type from URL
    const ext = path.extname(imageUrl).toLowerCase();
    let mimeType = "image/jpeg";
    if (ext === ".png") mimeType = "image/png";
    else if (ext === ".gif") mimeType = "image/gif";
    else if (ext === ".webp") mimeType = "image/webp";

    console.log("Gemini API URL:", GEMINI_API_URL);
    console.log(
      "Gemini API Key present?:",
      process.env.GEMINI_API_KEY ? "Yes" : "No"
    );

    const res = await fetch(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
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
                    mimeType,
                    data: imgBase64,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    console.log("Gemini API response status:", res.status);
    const raw = await res.text();
    console.log("Gemini API raw response:", raw);

    if (!res.ok) {
      return "Error generating caption (bad response).";
    }

    const data = JSON.parse(raw);
    const caption =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Could not generate caption.";
    return caption;
  } catch (err) {
    console.error("Caption generation error:", err);
    return "Error generating caption.";
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "captions",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }], // Optional: limit image size
    format: "jpg",
  },
});

const upload = multer({ storage });

const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return false;
  }
};

module.exports = {
  generateCaption,
  upload,
  deleteImage,
  cloudinary,
};
