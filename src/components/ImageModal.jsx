import React from "react";

export default function ImageModal({ isOpen, onClose, imageUrl }) {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold text-xl"
        >
          ✕
        </button>

        {/* Foto */}
        <img
          src={imageUrl}
          alt="Preview Foto"
          className="max-w-[80vw] max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
}
