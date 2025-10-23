import React, { useState } from "react";
import axios from "../api/axios";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

export default function ImageModal({ item, onClose, onDeleted }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(item.caption);
      toast.success("Caption copied!");
    } catch {
      toast.error("Failed to copy");
    }
  }

  async function del() {
    try {
      await axios.delete(`/captions/${item._id}`);
      toast.success("Caption deleted!");
      onDeleted();
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className="relative max-w-4xl w-full rounded-xl shadow-lg overflow-hidden p-6 max-h-[90vh] md:max-h-[80vh]"
          style={{ backgroundColor: "var(--card)" }}
        >
          {/* Image + Caption */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden h-full">
            <div className="flex items-center justify-center bg-black rounded-lg max-h-[60vh] overflow-hidden">
              <img
                src={`http://localhost:5000${item.imagePath}`}
                alt="Uploaded"
                className="object-contain max-h-full rounded"
              />
            </div>

            <div className="flex flex-col max-h-[60vh] overflow-auto">
              <h3 className="font-semibold text-lg" style={{ color: "var(--muted)" }}>
                Caption
              </h3>
              <p className="mt-3 whitespace-pre-line" style={{ color: "var(--muted)" }}>
                {item.caption}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={copyText}
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#e2e8f0" }}
            >
              Copy
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: "#ef4444" }}
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#d1d5db" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this caption?"
          onConfirm={() => {
            del();
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}
