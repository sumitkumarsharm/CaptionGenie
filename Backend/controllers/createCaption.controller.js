const { generateCaption } = require("../utils/generateCaption.js");
const Caption = require("../models/caption.model.js");

const createCaption = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

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
    return res.status(201).json(caption);
  } catch (err) {
    console.error("❌ Server error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = createCaption;
