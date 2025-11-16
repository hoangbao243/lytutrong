"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";

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
      ],
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
  const { id } = useParams();
  const pathName = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const checkActive = (item) => {
    if (pathName === item.link) return true;
    if (id == item.id) return true;
    if (item?.dropdownMenu?.some((d) => d.id == id)) return true;
    if (item?.dropdownMenu?.some((d) => d?.subMenu?.some((s) => s.id == id)))
      return true;
    return false;
  };
  const toggleMobileMenu = () => {
    setOpenMobile(!openMobile);
  };
  return (
    <header className="w-full sticky top-0 z-999 md:static max-w-7xl shadow-lg md:px-2">
      <div className="max-w-7xl bg-[url(/images/bg-menu.png)] mx-auto px-4 flex items-center justify-between md:justify-center h-16">
        {/* LOGO */}
        <Link href="/">
          <img
            src="/images/icon/home.png"
            className="w-12 h-12 rounded-full"
            alt="Home"
          />
        </Link>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpenMobile(!openMobile)}
        >
          ☰
        </button>

        {/* MENU LIST */}
        <nav
          className={`
            absolute md:static left-0 top-full h-fit md:h-full w-full md:w-auto
            md:bg-transparent bg-amber-300
             md:gap-4
            transition-all duration-300 z-99 md:px-2 md:visible
            ${
              openMobile
                ? "opacity-100 visible translate-y-0 md:translate-y-0"
                : "opacity-0 md:opacity-100 invisible md:static translate-y-10 md:translate-y-0"
            }
          `}
        >
          <ul className="flex flex-col md:flex-row xl:gap-2 w-full md:h-full">
            {menuItem.map((item) => (
              <li
                key={item.id}
                className={`relative group md:flex md:items-center ${
                  checkActive(item) ? "text-red-600 bg-[#FFB300]" : ""
                }`}
              >
                <div
                  className="flex md:flex-row justify-between items-center md:px-2 lg:px-3 xl:px-4 px-4 py-3 md:py-2 text-white hover:bg-zinc-700 md:hover:bg-transparent cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                  }
                >
                  <Link
                    href={item.link}
                    className={`uppercase md:text-[10px] lg:text-sm font-bold ${
                      checkActive(item) ? "text-red-600" : ""
                    }`}
                  >
                    {item.title}
                  </Link>

                  {/* Arrow SVG (thay cho lucide) */}
                  {item.dropdownMenu && (
                    <span className=" lg:ml-1 xl:ml-2 mr-4 md:mr-0 text-white">
                      <svg
                        className="w-2.5 h-2.5 ms-1 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Dropdown Desktop */}
                {item.dropdownMenu && (
                  <ul className="hidden md:absolute top-full md:group-hover:block bg-white shadow-lg rounded-md w-56 text-gray-700">
                    {item.dropdownMenu.map((sub) => (
                      <li key={sub.id} className="relative group/sub">
                        <Link
                          href={sub.link}
                          className="flex items-center justify-between px-4 py-2 hover:bg-zinc-100"
                        >
                          {sub.title}
                          {sub.subMenu && (
                            <span className="ml-2 text-black">
                              <svg
                                className="w-2.5 h-2.5 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </span>
                          )}
                        </Link>

                        {/* Submenu Desktop */}
                        {sub.subMenu && (
                          <ul className="hidden absolute right-full xl:left-full top-4 bg-white shadow-lg rounded-md w-56 group-hover/sub:block">
                            {sub.subMenu.map((s) => (
                              <li key={s.id}>
                                <Link
                                  href={s.link}
                                  className="block px-4 py-2 hover:bg-zinc-100"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Dropdown Mobile */}
                {item.dropdownMenu && (
                  <ul
                    className={`
                      md:hidden bg-amber-300 transition-all overflow-hidden duration-300
                      ${openDropdown === item.id ? "max-h-96" : "max-h-0"}
                    `}
                  >
                    {item.dropdownMenu.map((sub) => (
                      <li key={sub.id} className="uppercase font-bold text-sm">
                        <div
                          className="flex justify-between items-center pl-10 py-2"
                          onClick={() =>
                            setOpenSubDropdown(
                              openSubDropdown === sub.id ? null : sub.id
                            )
                          }
                        >
                          <Link href={sub.link} className="  text-white">
                            {sub.title}
                          </Link>
                          {sub.subMenu && (
                            <span className="md:hidden ml-2 text-white">
                              <svg
                                className="w-2.5 h-2.5 mr-4 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </span>
                          )}
                        </div>

                        {/* Submenu mobile */}
                        {sub.subMenu && (
                          <ul
                            className={`
                      md:hidden bg-amber-300 transition-all overflow-hidden duration-300
                      ${openSubDropdown === sub.id ? "max-h-96" : "max-h-0"}
                    `}
                          >
                            {sub.subMenu.map((s) => (
                              <li key={s.id} className="pl-10">
                                <Link
                                  href={s.link}
                                  className="block px-10 py-2 text-white"
                                >
                                  {s.title}
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
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
