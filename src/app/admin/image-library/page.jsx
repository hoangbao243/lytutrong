import Link from "next/link";
import React from "react";
const posts = [
  {
    id: 1,
    title: "Bài viết số 1",
    content: "Nội dung bài viết số 1...",
    created_at: "2026-01-07 10:30",
  },
  {
    id: 2,
    title: "Bài viết số 2",
    content: "Nội dung bài viết số 2...",
    created_at: "2026-01-07 10:30",
  },
  {
    id: 3,
    title: "Bài viết số 3",
    content: "Nội dung bài viết số 3...",
    created_at: "2026-01-07 10:30",
  },
  {
    id: 4,
    title: "Bài viết số 4",
    content: "Nội dung bài viết số 4...",
    created_at: "2026-01-07 10:30",
  },
];
export default function page() {

  return (
    <div>
      <div className="flex items-center ">
        <h1 className="font-bold text-3xl mr-2 my-2">Quản lý bài viết</h1>
        <Link
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
          title="Add New"
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
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left w-16">ID</th>
            <th className="px-4 py-3 text-left">Tiêu đề</th>
            <th className="px-4 py-3 text-left">Nội dung</th>
            <th className="px-4 py-3 text-left w-40">Ngày tạo</th>
            <th className="px-4 py-3 text-left w-40">Sửa</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {posts && posts?.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{post.id}</td>

              <td className="px-4 py-3 font-medium">
                {post.title}
              </td>

              <td className="px-4 py-3 text-gray-600 line-clamp-2">
                {post.content}
              </td>

              <td className="px-4 py-3 text-sm text-gray-500">
                {post.created_at}
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
