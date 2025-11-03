const path = require("path");
const fs = require("fs");
const Caption = require("../models/caption.model.js");
const deleteCaption = async (req, res) => {
  try {
    const captionId = req.params.id;
    const caption = await Caption.findById(captionId);
    if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    if (caption.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(caption.imagePath)
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await caption.deleteOne();
    return res.json({ message: "Caption deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { deleteCaption };
