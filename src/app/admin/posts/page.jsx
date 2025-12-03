"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ths = [
  "id",
  "Ảnh đại diện",
  "Tiêu đề",
  "Nội dung",
  "Mô tả",
  "Mục lục",
  "Tác giả",
  "Trạng Thái",
  "Ngày đăng",
  "Ngày cập nhật",
  "Nổi bật",
  "Hành động",
];

export default function PostsManagement() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const limit = 5;
  //   {
  //     id: 1,
  //     src: "/images/p1.jpg",
  //     caption: "Cổng trường ngày hội",
  //     description: "Bài viết mô tả sự kiện...",
  //     fulltext: "Lorem ipsum...",
  //     createDate: "2025-02-01",
  //     updateDate: "2025-02-10",
  //     categoryId: 3,
  //     userId: 1,
  //     status: "published",
  //     featured: true,
  //   },
  //   {
  //     id: 2,
  //     src: "/images/p2.jpg",
  //     caption: "Hoạt động ngoại khóa",
  //     description: "Bài viết mô tả hoạt động...",
  //     fulltext: "",
  //     createDate: "2025-02-02",
  //     updateDate: "2025-02-11",
  //     categoryId: 4,
  //     userId: 2,
  //     status: "draft",
  //     featured: false,
  //   },
  //   {
  //     id: 3,
  //     src: "/images/p2.jpg",
  //     caption: "Hoạt động ngoại khóa",
  //     description: "Bài viết mô tả hoạt động...",
  //     fulltext: "",
  //     createDate: "2025-02-02",
  //     updateDate: "2025-02-11",
  //     categoryId: 4,
  //     userId: 2,
  //     status: "draft",
  //     featured: false,
  //   },
  //   {
  //     id: 4,
  //     src: "/images/p2.jpg",
  //     caption: "Hoạt động ngoại khóa",
  //     description: "Bài viết mô tả hoạt động...",
  //     fulltext: "",
  //     createDate: "2025-02-02",
  //     updateDate: "2025-02-11",
  //     categoryId: 4,
  //     userId: 2,
  //     status: "draft",
  //     featured: false,
  //   },
  // ];
  const getPost = async () => {
    const res = await axios.get(`/api/post?page=${page}&limit=${limit}`);
    console.log(res);
    if (res.status == 200) {
      setPosts(res?.data?.data || []);
      console.log(res);
      setPagination(res?.data?.totalPages || 1);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    getPost();
  }, [page]);

  const nextPage = () => {
    if (page < pagination) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <div className="font-sans">
      <div className="flex items-center ">
        <h1 className="font-bold text-3xl mr-2">Quản lý bài viết</h1>

        <Link
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Add New"
          onClick={() => setOpen(true)}
          href={`/admin/newpost`}
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
        </Link>
      </div>
      <div>
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              {ths?.map((item, index) => (
                <th key={index} className={`p-3`}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {posts.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 transition ${
                  index % 2 == 0 ? "bg-gray-200" : ""
                }`}
              >
                <td className="p-3">{item.id}</td>

                <td className="p-3">
                  <img
                    src={item?.src}
                    width={360}
                    height={340}
                    className="rounded"
                    alt={item?.caption}
                  />
                </td>
                <td className="p-3 font-semibold">{item?.caption}</td>
                <td className="m-4 line-clamp-5 overflow-auto w-120">
                  {item?.description}
                </td>
                <td className="p-3">{item?.fulltext}</td>
                <td className="p-3">{item?.categoryId}</td>
                <td className="p-3">{item?.userId}</td>
                <td className="p-3">
                  {item.status === "published" ? (
                    <span className="px-3 py-1 bg-green-200 text-green-700 text-sm rounded">
                      Published
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-700 text-sm rounded">
                      Draft
                    </span>
                  )}
                </td>
                <td className="p-3">{item?.createDate}</td>
                <td className="p-3">{item?.updateDate}</td>
                
                
                <td className="p-3">
                  {item.featured ? (
                    <span className="px-3 py-1 bg-blue-200 text-blue-700 text-sm rounded">
                      Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    href={`/admin/posts/edit/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* PAGINATION */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          <span>
            Trang {pagination.page} / {pagination.totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === pagination.totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
