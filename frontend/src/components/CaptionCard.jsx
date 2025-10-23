import React from "react";

export default function CaptionCard({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded overflow-hidden shadow 
                 bg-white dark:bg-gray-800 
                 transition-colors duration-300"
    >
      <img
        src={`http://localhost:5000${item.imagePath}`}
        alt="img"
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        {/* Timestamp */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(item.createdAt).toLocaleString()}
        </div>

        {/* Caption */}
        <div className="mt-2 text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
          {item.caption}
        </div>
      </div>
    </div>
  );
}
