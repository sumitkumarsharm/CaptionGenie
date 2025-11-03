const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware.js");

// controllers
const allCaptions = require("../controllers/allCaptions.controller.js");
const { deleteCaption } = require("../controllers/deleteCaption.controller.js");
const createCaption = require("../controllers/createCaption.controller.js");

const { upload } = require("../utils/generateCaption.js");

router.post("/", auth, upload.single("image"), createCaption);
router.get("/", auth, allCaptions);
router.delete("/:id", auth, deleteCaption);

module.exports = router;
