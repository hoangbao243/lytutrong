"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Search from "./search/Search";
import axios from "axios";
import toast from "react-hot-toast";

export default function Menu() {
  const { id } = useParams();
  const pathName = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [menu,setMenu] = useState([])

  const checkActive = (item) => {
    if (pathName === item.link) return true;
    if (id == item.id) return true;
    if (item?.dropdownMenu?.some((d) => d.id == id)) return true;
    if (item?.dropdownMenu?.some((d) => d?.subMenu?.some((s) => s.id == id)))
      return true;
    return false;
  };

  useEffect(()=>{
    const getMenuItem = async () =>{
      try {
        const res = await axios.get(`/api/category`)
      console.log(res.data);
      if (res.status == 200) {
        setMenu(res.data)
      }
      } catch (error) {
        toast.error(error)
      }
    }
    getMenuItem()
  },[])
  return (
    <header className="w-full sticky top-0 z-50 max-w-7xl shadow-lg md:px-2">
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
            transition-all duration-300 z-50 md:px-2 md:visible
            ${
              openMobile
                ? "opacity-100 visible translate-y-0 md:translate-y-0"
                : "opacity-0 md:opacity-100 invisible md:static translate-y-10 md:translate-y-0"
            }
          `}
        >
          <ul className="flex flex-col md:flex-row xl:gap-2 w-full md:h-full">
            {menu && menu?.map((item) => (
              <li
                key={item.id}
                className={`relative group md:flex md:items-center  ${
                  checkActive(item)
                    ? "text-red-600 bg-[#FFB300] md:border-b-2 md:border-black"
                    : ""
                }`}
              >
                <div
                  className="flex md:flex-row justify-between hover:text-black md:h-full items-center text-white md:px-2 lg:px-3 xl:px-4 px-4 py-3 md:py-2 hover:bg-zinc-700 md:hover:bg-transparent cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                  }
                >
                  <Link
                    href={item?.id == 1 ? `/` : `/post/${item?.id}`}
                    className={`flex uppercase w-full h-full items-center  md:text-[10px] lg:text-sm font-bold ${
                      checkActive(item) ? "text-red-600" : ""
                    }`}
                  >
                    {item.name}
                  </Link>

                  {/* Arrow SVG (thay cho lucide) */}
                  {item.children[0] && (
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
                {item.children[0] && (
                  <ul className="hidden md:absolute top-full md:group-hover:block bg-white shadow-lg rounded-md w-56 text-gray-700">
                    {item.children?.map((sub) => (
                      <li key={sub.id} className="relative group/sub ">
                        <Link
                          href={`/post/${sub?.id}`}
                          className="flex items-center justify-between px-4 py-2 hover:bg-zinc-100 hover:text-red-400"
                        >
                          {sub.name}
                          {sub.children[0] && (
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
                        {sub.children[0] && (
                          <ul className="hidden absolute right-full xl:left-full top-4 bg-white shadow-lg rounded-md w-56 group-hover/sub:block">
                            {sub.children?.map((s) => (
                              <li key={s.id}>
                                <Link
                                  href={`/post/${s.id}`}
                                  className="block px-4 py-2 hover:bg-zinc-100 hover:text-red-400"
                                >
                                  {s.name}
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
                {item.children[0] && (
                  <ul
                    className={`
                      md:hidden bg-amber-300 transition-all overflow-hidden duration-300
                      ${openDropdown === item.id ? "max-h-96" : "max-h-0"}
                    `}
                  >
                    {item.children.map((sub) => (
                      <li key={sub.id} className="uppercase font-bold text-sm">
                        <div
                          className="flex justify-between items-center pl-10 py-2"
                          onClick={() =>
                            setOpenSubDropdown(
                              openSubDropdown === sub.id ? null : sub.id
                            )
                          }
                        >
                          <Link
                            href={`/post/${sub?.id}`}
                            className="  text-white"
                          >
                            {sub.name}
                          </Link>
                          {sub.children[0] && (
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
                        {sub.children && (
                          <ul
                            className={`
                      md:hidden bg-amber-300 transition-all overflow-hidden duration-300
                      ${openSubDropdown === sub.id ? "max-h-96" : "max-h-0"}
                    `}
                          >
                            {sub.children.map((s) => (
                              <li key={s.id} className="pl-10">
                                <Link
                                  href={`/post/${s?.id}`}
                                  className="block px-10 py-2 text-white"
                                >
                                  {s.name}
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
            <Search></Search>
          </ul>
        </nav>
      </div>
    </header>
  );
}
