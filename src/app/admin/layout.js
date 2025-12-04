"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const sidebarItems = [
    { id: 1, title: "Posts", src: "/admin/posts", icon: "" },
    { id: 2, title: "Website", src: "/admin/website", icon: "" },
    { id: 3, title: "Users", src: "/admin/users", icon: "" },
  ];
  const [open, setOpen] = useState(true);
  const navigate = useRouter()
  const openNavbar = () => {
    setOpen(!open);
  };

  const handleLogout = async () =>{
    const res = await axios.post(`/api/logout`);
    if (res.status == 200) {
      navigate.push(`/login`)
    }else{
      console.log(res);
    }
  }

  return (
    <div className="flex font-sans bg-[#F9FAFB]">
      <div className="flex-1">
        <header className="sticky top-0 bg-linear-to-r from-[#7cbf96] to-[#b3d3bf] shadow p-4 flex justify-between  items-center z-100">
          <div className="flex items-center ">
            <img
              src="/images/icon/menu.png"
              className="w-5 h-5 m-2 cursor-pointer"
              alt="menu"
              onClick={openNavbar}
            ></img>
            <Link href={`/admin/`} className="text-xl font-semibold m-2 ml-10">
              Admin Panel
            </Link>
          </div>

          <div className="flex items-center">
            <p>Admin</p>
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center ml-2 cursor-pointer" onClick={handleLogout}>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </header>
        <aside
          className={`${
            open == true ? "w-64" : "w-16"
          } duration-300 space-y-5 h-full fixed border-r-1 border-gray-300 bg-gray-200/50`}
        >
          <nav className=" space-y-3 text-black">
            <div className="py-1.5">
              {sidebarItems &&
                sidebarItems?.map((item) => (
                  <Link
                    key={item?.id}
                    href={item?.src}
                    className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 transition-all duration-200"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                    <div className="w-8 h-8 px-2 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-300 transition-colors duration-200">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="h-5 w-5 text-blue-600 group-hover:text-[#2b6cb0]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <span
                      className={`${
                        open == true ? "block" : "hidden"
                      } font-medium text-gray-700 group-hover:text-[#1a365d] ml-3`}
                    >
                      {item?.title}
                    </span>
                  </Link>
                ))}
            </div>
          </nav>
        </aside>
        <main className={`p-6 ${open == true ? "ml-64" : "ml-16"} duration-300 h-fit`}>
          {children}
        </main>
      </div>
    </div>
  );
}
