import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
        {children}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-400 rounded">
          Đóng
        </button>
      </div>
    </div>
  );
}
