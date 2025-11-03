const mongoose = require("mongoose");

const CaptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imagePath: { type: String, required: true },
    caption: { type: String, required: true },
    language: { type: String, default: "en" },
  },
  { timestamps: true }
);

CaptionSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Caption", CaptionSchema);
