"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((img) => {
      formData.append("images", img);
    });

    const res = await axios.post(`/api/image-post`,formData)
    if (res.status == 200) {
      console.log("res.............",res);
      toast.success("Đăng thành công!")
    }

    // TODO: gọi API / Server Action
    console.log("Submit data:", { title, content, images });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl bg-white p-6 rounded-lg border border-gray-200 space-y-6"
    >
      <h2 className="text-xl font-semibold">Thêm bài viết thư viện ảnh</h2>

      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Tiêu đề</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block mb-1 font-medium">Nội dung</label>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Upload images */}
      <div>
        <label className="block mb-2 font-medium">Ảnh thư viện</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* Preview images */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((file, index) => (
            <div
              key={index}
              className="relative aspect-square border rounded-lg overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Lưu bài viết
        </button>
      </div>
    </form>
  );
}
