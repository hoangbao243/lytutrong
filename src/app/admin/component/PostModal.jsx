import React from "react";
import Editor from "./Editor";

export default function PostModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-[70%] animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <p className="font-bold text-xl my-2">Bài Viết Mới</p>
        <Editor></Editor>
      </div>
    </div>
  );
}
