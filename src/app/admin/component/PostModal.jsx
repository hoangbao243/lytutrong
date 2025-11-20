import React from "react";

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
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <p className="font-bold text-xl">Bài Viết Mới</p>
        <form onSubmit={(e) => handleForm(e)}>
          <div className="mt-4">
            <label className="text-black" htmlFor="title">
              Tiêu đề
            </label>
            <input
              placeholder="Tiêu đề"
              name="title"
              className="w-full bg-white rounded-md border-gray-300 border text-black px-2 py-1"
              type="text"
            />
          </div>
          <div className="mt-4">
            <label className="text-black" htmlFor="description">
              Mô tả
            </label>
            <textarea
              placeholder="Tiêu đề"
              name="description"
              className="w-full bg-white rounded-md border-gray-300 border text-black px-2 py-1"
              type="text"
            />
          </div>

          <button
            type="submit"
            className="p-2 border border-gray-300 rounded-2xl mt-2 bg-blue-200"
          >
            Đăng
          </button>
        </form>
      </div>
    </div>
  );
}
