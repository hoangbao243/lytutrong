"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const getData = async () => {
    const res = await axios.get(`/api/image-post/${id}`);
    if (res.status == 200) {
      console.log("data", res.data.data);
      setUpdateData({ ...updateData, images: res.data.data });
      setData(res.data.data);
      setItems(res.data.data);
    }
  };

  const handleImageChange = async (e) => {
    try {
      setLoading(true);
      const files = Array.from(e.target.files);
      const formData = new FormData();
      //title
      formData.append("lenImages", data?.length);
      //images
      files.forEach((img) => {
        formData.append("images", img);
      });
      const res = await axios.post(`/api/image-post/${id}`, formData);
      if (res.status == 200) {
        toast.success("Đăng thành công!");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      getData();
    }
  };

  const handlePublish = () => {};

  const handleCancel = () => {};

  useEffect(() => {
    console.log("updateData", updateData);
  }, [updateData]);

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // dùng useRef để lưu item đang kéo (không gây re-render)
  const draggedItem = useRef(null);

  const onDragStart = (e, index) => {
    draggedItem.current = items[index];
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (index) => {
    const draggedOverItem = items[index];
    console.log("index", index + 1);
    console.log("item index", items[index + 1]);

    // kéo lên chính nó thì bỏ qua
    if (draggedItem.current === draggedOverItem) {
      return;
    }

    // loại bỏ item đang kéo
    const newItems = items.filter((item) => item !== draggedItem.current);

    // chèn vào vị trí mới
    newItems.splice(index, 0, draggedItem.current);

    setItems(newItems);
  };

  const onDragEnd = () => {
    draggedItem.current = null;
    setData(items);
  };

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
          onChange={(e) =>
            setUpdateData({ ...updateData, title: e.target.value })
          }
        />
        <label htmlFor="description" className="text-lg font-semibold">
          Mô tả
        </label>
        <input
          type="text"
          name="decscription"
          className="border border-gray-300 w-1/2 rounded-md h-5 p-4 mb-4"
          placeholder="Mô tả"
          onChange={(e) =>
            setUpdateData({ ...updateData, description: e.target.value })
          }
        />
        <div>
          <div className="grid w-full max-w-xs items-center gap-1.5 mb-4">
            <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Thêm ảnh
            </label>
            <input
              className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              <th className="px-4 py-3 w-16 text-left">ID</th>
              <th className="px-4 py-3 text-left">Ảnh</th>
              <th className="px-4 py-3 w-24 text-left">Thứ tự cũ</th>
              <th className="px-4 py-3 w-24 text-left">Thứ tự mới</th>
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
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={() => onDragOver(index)}
                  onDragEnd={onDragEnd}
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
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 text-sm text-gray-500">
                    {img.created_at}
                  </td>

                  <td className="flex mt-4 px-4 py-3 text-center space-x-2">
                    <button className="px-3 py-1 text-sm text-red-600 hover:underline">
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handlePublish}
          className="bg-green-300 p-2 rounded cursor-pointer"
        >
          Cập nhật
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-300 p-2 rounded cursor-pointer"
        >
          Hủy
        </button>
      </div>
    </>
  );
}
