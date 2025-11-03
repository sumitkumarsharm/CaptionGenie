const Caption = require("../models/caption.model.js");
const allCaptions = async (req, res) => {
  try {
    const items = await Caption.find({ user: req.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = allCaptions;
