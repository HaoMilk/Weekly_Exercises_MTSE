import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}
