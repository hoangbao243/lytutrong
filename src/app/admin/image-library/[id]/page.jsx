"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const images = [
  {
    id: 1,
    image_url: "/images/AnhTinTuc/2025/10/Thuc_don-T5.jpg",
    sort_order: 1,
    created_at: "2026-01-07 10:30",
  },
  {
    id: 2,
    image_url: "/images/AnhTinTuc/2025/10/Thuc_don-T6.jpg",
    sort_order: 2,
    created_at: "2026-01-07 10:31",
  },
  {
    id: 3,
    image_url: "/images/AnhTinTuc/2025/10/Thuc_don-T7.jpg",
    sort_order: 3,
    created_at: "2026-01-07 10:31",
  },
  {
    id: 4,
    image_url: "/images/AnhTinTuc/2025/10/Thuc_don-T8.jpg",
    sort_order: 4,
    created_at: "2026-01-07 10:31",
  },
];

export default function page() {
    const {id} = useParams()
    console.log(id);
    
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 w-16 text-left">ID</th>
            <th className="px-4 py-3 text-left">Ảnh</th>
            <th className="px-4 py-3 w-24 text-left">Thứ tự</th>
            <th className="px-4 py-3 w-40 text-left">Ngày tạo</th>
            <th className="px-4 py-3 w-32 text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {images.map((img) => (
            <tr key={img.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{img.id}</td>

              <td className="px-4 py-3">
                <div className="relative w-28 h-20 rounded-md overflow-hidden border">
                  <Image
                    src={img.image_url}
                    loading="eager"
                    alt="Post image"
                    sizes="true"
                    fill
                    className="object-cover"
                  />
                </div>
              </td>

              <td className="px-4 py-3">{img.sort_order}</td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {img.created_at}
              </td>

              <td className="px-4 py-3 text-center space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:underline">
                  Sửa
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:underline">
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
