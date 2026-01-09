"use client"
import { formatDateTime } from "@/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [list, setList] = useState([])
  useEffect(()=>{
    const getList = async () =>{
      const res = await axios.get(`/api/image-post`)
      if (res.status == 200) {
        setList(res.data.data)
        console.log("res.............",res);
      }
    }
    getList()
  },[])

  return (
    <div>
      <div className="flex items-center ">
        <h1 className="font-bold text-3xl mr-2 my-2">Thư viện ảnh</h1>
        <Link
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Add New"
          href={`/admin/image-library/new-image-post`}
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
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-300 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left w-16">ID</th>
            <th className="px-4 py-3 text-left">Tiêu đề</th>
            <th className="px-4 py-3 text-left">Nội dung</th>
            <th className="px-4 py-3 text-left w-40">Ngày tạo</th>
            <th className="px-4 py-3 text-left w-40">Sửa</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300">
          {list && list?.map((post,index) => (
            <tr key={post.id} className={`hover:bg-gray-200 ${index%2 == 0 ? `bg-gray-200` : ``}`}>
              <td className="px-4 py-3">{post.id}</td>

              <td className="px-4 py-3 font-medium">
                {post.title}
              </td>

              <td className="px-4 py-3 text-gray-600 line-clamp-2">
                {post.description}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {formatDateTime(post.createDate)}
              </td>
              <td>
                <Link href={`/admin/image-library/${post.id}`} className="p-4">
                  Sửa
                </Link>
                <button className="p-4">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
