import Link from "next/link";
import React from "react";

export default function Module() {
  const menuItem = [
    {
      id: 1,
      title: "Trang chủ",
      parent: null,
    },
    {
      id: 2,
      title: "Nhà trường",
      parent: null,
    },
    {
      id: 3,
      title: "Đoàn thể",
      parent: null,
    },
    {
      id: 4,
      title: "Hoạt động giảng dạy",
      link: "/post/4",
    },
    {
      id: 5,
      title: "thư viện",
      parent: null,
    },
    {
      id: 6,
      title: "Công khai",
      parent: null,
    },
    {
      id: 7,
      title: "Thực đơn",
      parent: null,
    },
    {
      id: 8,
      title: "Lịch sử hình thành",
      parent: 2,
    },
    {
      id: 9,
      title: "Cơ cấu tổ chức",
      parent: 2,
    },
    {
      id: 10,
      title: "Thành tích",
      parent: 2,
    },
    {
      id: 11,
      title: "Các hoạt động",
      parent: 2,
    },
    {
      id: 12,
      title: "Danh mục sách",
      parent: 5,
    },
    {
      id: 13,
      title: "Giới thiệu sách",
      parent: 5,
    },
    {
      id: 14,
      title: "Hoạt động thư viện",
      parent: 5,
    },
    {
      id: 15,
      title: "Thư viện ảnh",
      parent: 5,
    },
    {
      id: 16,
      title: "Sách thiếu nhi",
      parent: 12,
    },
    {
      id: 17,
      title: "Sách tham khảo",
      parent: 12,
    },
    {
      id: 18,
      title: "Sách giáo viên",
      parent: 12,
    },
    {
      id: 19,
      title: "Sách dùng chung",
      parent: 12,
    },
    {
      id: 20,
      title: "Chi bộ",
      parent: 3,
    },
    {
      id: 21,
      title: "Chi đoàn",
      parent: 3,
    },
    {
      id: 23,
      title: "Liên đội",
      parent: 3,
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-3xl ">Quản lý bài viết</h1>
      <div>
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              {menuItem &&
                Object.keys(menuItem[0])?.map((item, index) => (
                  <th key={index} className={`p-3`}>
                    {item}
                  </th>
                ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {menuItem &&
              menuItem.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 == 0 ? "bg-gray-200" : ""
                  }`}
                >
                  <td className="p-3">{item.id}</td>

                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.parent}</td>
                  <td className="p-3 space-x-2">
                    <Link
                      href={`#`}
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
