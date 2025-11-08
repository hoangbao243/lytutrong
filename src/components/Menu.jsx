"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Menu() {
  const menuItem = [
    {
      id: 1,
      title: "Trang chủ",
      link: "/",
    },
    {
      id: 2,
      title: "Nhà trường",
      link: "/about",
      parent: "/post/8",
      dropdownMenu: [
        {
          id: 8,
          title: "Lịch sử hình thành",
          link: "/post/8",
        },
        {
          id: 9,
          title: "Cơ cấu tổ chức",
          link: "/post/9",
        },
        {
          id: 10,
          title: "Thành tích",
          link: "/post/10",
        },
        {
          id: 11,
          title: "Các hoạt động",
          link: "/post/11",
        },
      ],
    },
    {
      id: 3,
      title: "Đoàn thể",
      link: "/post/3",
      dropdownMenu: [
        {
          id: 20,
          title: "Chi bộ",
          link: "/post/20",
        },
        {
          id: 21,
          title: "Chi đoàn",
          link: "/post/21",
        },
        {
          id: 22,
          title: "Công đoàn",
          link: "/post/22",
        },
        {
          id: 23,
          title: "Liên đội",
          link: "/post/23",
        },
      ]
    },
    {
      id: 4,
      title: "Hoạt động giảng dạy",
      link: "/post/4",
    },
    {
      id: 5,
      title: "thư viện",
      link: "/post/5",
      dropdownMenu: [
        {
          id: 12,
          title: "Danh mục sách",
          link: "/post/12",
          subMenu: [
            {
              id: 16,
              title: "Sách thiếu nhi",
              link: "/post/16",
            },
            {
              id: 17,
              title: "Sách tham khảo",
              link: "/post/17",
            },
            {
              id: 18,
              title: "Sách giáo viên",
              link: "/post/18",
            },
            {
              id: 19,
              title: "Sách dùng chung",
              link: "/post/19",
            },
          ],
        },
        {
          id: 13,
          title: "Giới thiệu sách",
          link: "/post/13",
        },
        {
          id: 14,
          title: "Hoạt động thư viện",
          link: "/post/14",
        },
        {
          id: 15,
          title: "Thư viện ảnh",
          link: "/post/15",
        },
      ],
    },
    {
      id: 6,
      title: "Công khai",
      link: "/post/6",
    },
    {
      id: 7,
      title: "Thực đơn",
      link: "/post/7",
    },
  ];
  const pathName = usePathname()
  return (
    <div className="flex gap-4 min-h-14 w-full bg-red-300">
      <nav className="flex justify-center items-center max-w-screen-xl w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <ul className="flex justify-between  h-full gap-2 z-1 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {menuItem &&
            menuItem.map((item) => {
              const isActive = pathName === item.link || item?.dropdownMenu?.some(item=>item.link === pathName) || item?.dropdownMenu?.some(item=>item?.subMenu?.some(subItem=>subItem.link === pathName));
              return (
              <li key={item.id} className={`flex relative  group p-2 m-0 hover:bg-orange-400 ${isActive === true ? 'bg-red-500' : ''}`} >
                <Link
                  href={item?.link}
                  className={`flex items-center justify-center uppercase font-medium text-balance  ${isActive === true ? 'text-white md:text-white md:p-0 md:dark:text-white' : ''} hover:text-white rounded-sm md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-gray-600 dark:bg-grtext-gray-600 md:dark:bg-transparent `}
                  aria-current="page"
                >
                  {item?.title}
                  {
                    item.dropdownMenu && (
                      <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    )
                  }
                </Link>
                {item.dropdownMenu && (
                  <ul className="absolute left-0 top-full mt-0 w-56 rounded-md bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdownMenu.map((sub) => (
                      <li key={sub.id} className="relative group/sub">
                        <Link
                          href={sub.link}
                          className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-400"
                        >
                          {sub.title}
                          {
                            sub.subMenu && (
                              <svg className="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                              </svg>
                            )
                          }
                        </Link>
                        {sub.subMenu && (
                          <ul className="absolute left-full top-3 ml-1 w-56 rounded-md bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-50">
                            {sub.subMenu.map((subItem) => (
                              <li key={subItem.id} className="m-0">
                                <Link
                                  href={subItem.link}
                                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 whitespace-nowrap hover:text-red-400"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              )
            })}
        </ul>
      </nav>
    </div>
  );
}
