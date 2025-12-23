import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../component/DeleteModal";
import axios from "axios";
import CategoryModal from "./CategoryModal";
import Loader from "@/components/loader/Loader";

export default function Module() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const onDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const res = await axios.delete(`/api/category/${id}`);
      console.log(res);

      if (res.status == 200) {
        alert("Xóa thành công!!!");
        const res = await axios.get("/api/category");
        setCategories(res?.data);
      }
      // reload list
    } catch (err) {
      alert(err.response?.data?.message || "Không thể xóa danh mục");
    } finally {
      setOpenDeleteModal(false);
      setLoading(true)
    }
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setOpenModal(true);
  };

  const handleEdit = (item) => {
    setCurrentCategory(item);
    setOpenModal(true);
  };

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const res = await axios.get(`/api/category`);
      if (res.status == 200) {
        setCategories(res.data);
      }
      setLoading(false)
    };
    getCategories();
  }, []);

  const renderRows = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <tr
          className={`border-b hover:bg-gray-50 transition ${
            level === 0 ? "bg-gray-200" : ""
          }`}
        >
          <td className="p-3">{item.id}</td>

          {/* thụt lề theo cấp */}
          <td className="p-3">
            <span style={{ paddingLeft: `${level * 20}px` }}>
              {level > 0 && "— ".repeat(level)}
              {item.name}
            </span>
          </td>

          <td className="p-3">{item.parent ?? "—"}</td>

          <td className="p-3 space-x-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                console.log(item);

                handleEdit(item);
              }}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>

        {/* render con */}
        {item.children &&
          item.children.length > 0 &&
          renderRows(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      if (data.id) {
        await axios.put(`/api/category/${data.id}`, data);
        alert("Cập nhật thành công");
      } else {
        await axios.post("/api/category", data);
        alert("Thêm thành công");
      }

      const res = await axios.get("/api/category");
      setCategories(res.data);
      setOpenModal(false);
      console.log(data);
    } catch (err) {
      alert(err.response?.data?.message || "Có lỗi xảy ra");
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          <div className="p-4 flex items-center">
            <h1 className="text-3xl">Quản lý danh mục</h1>
            <button
              className="group cursor-pointer outline-none hover:rotate-90 duration-300 ml-4 mt-1"
              title="Add New"
              onClick={handleAdd}
            >
              <svg
                className="stroke-gray-400 fill-none group-hover:fill-gray-500 group-active:stroke-gray-200 group-active:fill-gray-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path strokeWidth="1.5" d="M8 12H16"></path>
                <path strokeWidth="1.5" d="M12 16V8"></path>
              </svg>
            </button>
          </div>
          <CategoryModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSubmit={handleSubmit}
            categories={categories}
            category={currentCategory}
          />

          <div>
            <table className="w-full bg-white shadow rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="pl-2">ID</th>
                  <th>Danh mục</th>
                  <th>Danh mục cha</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>{categories && renderRows(categories)}</tbody>
            </table>
            <DeleteModal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              onConfirm={() => handleDelete(deleteId)}
            ></DeleteModal>
          </div>
        </div>
      )}
    </>
  );
}
