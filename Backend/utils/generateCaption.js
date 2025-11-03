const fs = require("fs");
const path = require("path");
const multer = require("multer");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Gemini API endpoint
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const generateCaption = async (language, imagePath) => {
  try {
    console.log("📸 Sending image buffer to Gemini...");

    const rel = imagePath.replace(/^\/+/, "");
    const localPath = path.join(__dirname, "..", rel);

    if (!fs.existsSync(localPath)) {
      console.error("Image not found at", localPath);
      return "Error generating caption (image not found).";
    }

    const imgBuffer = fs.readFileSync(localPath);
    const imgBase64 = imgBuffer.toString("base64");

    // detect mime type
    const ext = path.extname(localPath).toLowerCase();
    let mimeType = "image/jpeg";
    if (ext === ".png") mimeType = "image/png";
    else if (ext === ".gif") mimeType = "image/gif";
    else if (ext === ".webp") mimeType = "image/webp";

    console.log("Gemini API URL:", GEMINI_API_URL);
    console.log(
      "Gemini API Key present?:",
      process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No"
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = {
  generateCaption,
  storage,
  upload,
};
