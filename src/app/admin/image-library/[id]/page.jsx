"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DeleteModal from "../../component/DeleteModal";
import Loader2 from "@/components/loader/Loader2";

export default function page() {
  const [data, setData] = useState();
  const [updateData, setUpdateData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

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

  const onDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteImage = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/image-post/image/${id}`);
      if (res.status == 200) {
        toast.success(res.data.message);
        console.log("ressssssssssssss", res);
        getData();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpenDeleteModal(false);
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      const res = await axios.put(`/api/image-post/image/${id}`, updateData);

      if (res.status == 200) {
        toast.success("Cập nhật thành công");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.message);
    }
  };

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
    setUpdateData({ ...updateData, images: items });
    setData(items);
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center"><Loader2></Loader2></div>
      ) : (
        <div>
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
              <div className="max-w-40 rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="w-full pb-3">
                    <div className="relative h-20 rounded-lg border-2 border-gray-400 bg-gray-100 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                      <div className="absolute flex flex-col items-center">
                        <img
                          alt="File Icon"
                          className="w-10 h-10"
                          src="/images/icon/image.png"
                        />
                        <span className="block text-gray-500 font-semibold">
                          Thêm ảnh
                        </span>
                      </div>

                      <input
                        name=""
                        className="h-full w-full opacity-0 cursor-pointer"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
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
                        <button
                          className="px-3 py-1 text-sm text-red-600 hover:underline"
                          onClick={() => onDelete(img.id)}
                        >
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
          <DeleteModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={() => handleDeleteImage(deleteId)}
          ></DeleteModal>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      )}
    </>
  );
}
