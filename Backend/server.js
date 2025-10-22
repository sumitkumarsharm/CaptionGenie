require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.route");
const captionRoutes = require("./routes/caption.route");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/captions", captionRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => console.error(err));
