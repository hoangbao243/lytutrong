
import axios from "axios";
import React, { useState } from "react";

export default function HeaderSetting() {
  const [image, setImage] = useState();
  const [refresh, setRefresh] = useState(0);
  const handleUpload = async () => {
    if (!image) return;
    const form = new FormData();
    form.append("file", image);
    try {
      const res = await axios.post(`/api/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      res.status == 200 ? alert("Đã thay banner!") : alert("Upload lỗi");
      setRefresh(prev => prev + 1);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Upload lỗi");
    }
  };

  return (
    <div>
      <p className="font-bold text-3xl">Banner</p>
      <img src={`/api/upload/banner?r=${refresh}`}/>
      <div className="grid w-full max-w-xs items-center gap-1.5">
        <label className="text-lg text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-2">
          Kích thước banner phải từ 1200x400
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button
        className="cursor-pointer mt-2 transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
        border-blue-600
        border-b-2 hover:brightness-110 hover:-translate-y-px hover:border-b-[6px]
        active:border-b active:brightness-90 active:translate-y-0.5"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}
