import React, { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateCaption() {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // loader state
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select an image first!");
      return;
    }

    const form = new FormData();
    form.append("image", file);
    form.append("language", language);

    try {
      setLoading(true);
      await axios.post("/captions", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Immediate toast in CreateCaption
      toast.success("Caption created successfully 🎉");

      // Show loader before redirect
      setRedirecting(true);

      // Delay 1.5s, then navigate to Gallery
      setTimeout(() => {
        navigate("/gallery", { state: { message: "Welcome to Gallery!" } });
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  if (redirecting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow"
      style={{ backgroundColor: "var(--card)", color: "var(--muted)" }}
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--muted)" }}
      >
        Create Caption
      </h2>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 rounded border"
          style={{ borderColor: "var(--muted)", color: "var(--muted)" }}
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded border w-40"
          style={{ borderColor: "var(--muted)", color: "var(--muted)" }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="zh">Chinese (Simplified)</option>
          <option value="ar">Arabic</option>
          <option value="ru">Russian</option>
        </select>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="p-3 rounded flex items-center justify-center"
          style={{ backgroundColor: "#4f46e5", color: "#fff" }}
          disabled={loading}
        >
          {loading ? (
            <div>
              Loading...
              {""}
              <span className="button-loader"></span>
            </div>
          ) : (
            "Create Caption"
          )}
        </motion.button>
      </form>
    </div>
  );
}
