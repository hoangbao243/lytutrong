"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get(`/api/image-post/${id}`);
        if (res) {
          setData(res.data.data);
        }
      };
      getData();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-lg font-semibold">
          Tiêu đề
        </label>
        <input
          type="text"
          name="title"
          className="border border-gray-300 w-1/2 rounded-md h-5 p-4"
          placeholder="Tiêu đề"
          onChange={e=>setTitle(e.target.value)}
        />
        <label htmlFor="description" className="text-lg font-semibold">
          Mô tả
        </label>
        <input
          type="text"
          name="decscription"
          className="border border-gray-300 w-1/2 rounded-md h-5 p-4 mb-4"
          placeholder="Mô tả"
          onChange={e=>setDescription(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              <th className="px-4 py-3 w-16 text-left">ID</th>
              <th className="px-4 py-3 text-left">Ảnh</th>
              <th className="px-4 py-3 w-24 text-left">Thứ tự</th>
              <th className="px-4 py-3 w-40 text-left">Ngày tạo</th>
              <th className="px-4 py-3 w-32 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-300">
            {data &&
              data.map((img, index) => (
                <tr
                  key={img.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 == 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="px-4 py-3">{img.id}</td>

                  <td className="px-4 py-3">
                    <div className="relative w-28 h-20 rounded-md overflow-hidden border border-gray-300 shadow-2xl">
                      <Image
                        src={img.src}
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

                  <td className="flex mt-4 px-4 py-3 text-center space-x-2">
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
    </>
  );
}
