import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import CaptionCard from "../components/CaptionCard";
import ImageModal from "../components/ImageModal";
import EmptyPNG from "../assets/empty.png"; // Put your empty image in src/assets/empty.png

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  async function load() {
    try {
      const res = await axios.get("/captions");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Load captions on mount
  useEffect(() => {
    load();
  }, []);

  // Show toast if a message exists in state
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear the message so toast doesn't repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="mt-6 pb-11 min-h-[80vh]">
      {items.length === 0 ? (
      <h2 className="text-xl font-semibold text-center mb-4"></h2>
      ) : (
        <h2 className="text-4xl font-semibold text-center mb-10">Gallery</h2>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-42">
          <img
            src={EmptyPNG}
            alt="No captions"
            className="w-40  object-contain mb-4"
          />
          <p className="text-gray-500 ">No captions yet. Create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <CaptionCard key={it._id} item={it} onClick={() => setSelected(it)} />
          ))}
        </div>
      )}

      {selected && (
        <ImageModal
          item={selected}
          onClose={() => setSelected(null)}
          onDeleted={() => {
            setSelected(null);
            load();
          }}
        />
      )}
    </div>
  );
}
