import Link from "next/link";
import React from "react";

export default function PostsManagement() {
  const posts = [
    {
      id: 1,
      src: "/images/p1.jpg",
      caption: "Cổng trường ngày hội",
      description: "Bài viết mô tả sự kiện...",
      fulltext: "Lorem ipsum...",
      createDate: "2025-02-01",
      updateDate: "2025-02-10",
      categoryId: 3,
      userId: 1,
      status: "published",
      featured: true,
    },
    {
      id: 2,
      src: "/images/p2.jpg",
      caption: "Hoạt động ngoại khóa",
      description: "Bài viết mô tả hoạt động...",
      fulltext: "",
      createDate: "2025-02-02",
      updateDate: "2025-02-11",
      categoryId: 4,
      userId: 2,
      status: "draft",
      featured: false,
    },
    {
      id: 3,
      src: "/images/p2.jpg",
      caption: "Hoạt động ngoại khóa",
      description: "Bài viết mô tả hoạt động...",
      fulltext: "",
      createDate: "2025-02-02",
      updateDate: "2025-02-11",
      categoryId: 4,
      userId: 2,
      status: "draft",
      featured: false,
    },
    {
      id: 4,
      src: "/images/p2.jpg",
      caption: "Hoạt động ngoại khóa",
      description: "Bài viết mô tả hoạt động...",
      fulltext: "",
      createDate: "2025-02-02",
      updateDate: "2025-02-11",
      categoryId: 4,
      userId: 2,
      status: "draft",
      featured: false,
    },
  ];
  return (
    <div className="font-sans">
      <h1 className="font-bold text-3xl ">Quản lý bài viết</h1>
      <div>
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              {posts &&
                Object.keys(posts[0])?.map((item, index) => (
                  <th key={index} className={`p-3`}>{item}</th>
                ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((item, index) => (
              <tr key={index} className={`border-b hover:bg-gray-50 transition ${index % 2 == 0 ? "bg-gray-200" : ""}`}>
                <td className="p-3">{item.id}</td>

                <td className="p-3">
                  <img
                    src={item?.src}
                    width={60}
                    height={40}
                    className="rounded"
                    alt={item?.caption}
                  />
                </td>
                <td className="p-3 font-semibold">{item.caption}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.fulltext}</td>
                <td className="p-3">{item.createDate}</td>
                <td className="p-3">{item.updateDate}</td>
                <td className="p-3">{item.categoryId}</td>
                <td className="p-3">{item.userId}</td>
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
      </div>
    </div>
  );
}
