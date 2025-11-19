"use client";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#7cbf96] to-[#b3d3bf] shadow p-4 flex justify-between  items-center">
          <div className="flex items-center">
            <img
              src="/images/icon/menu.png"
              className="w-5 h-5 m-2"
              alt="menu"
            ></img>
            <h1 className="text-xl font-semibold m-2 ml-10">Admin Panel</h1>
          </div>

          <div className="flex items-center">
            <p>Admin</p>
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center ml-2">
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
        <aside className="w-64 space-y-5 fixed h-full border-r-2 border-gray-300">
          <nav className=" space-y-3 text-black">
            <div className="py-1.5">
              <Link
                href="/admin/users"
                className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 transition-all duration-200"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-300 transition-colors duration-200">
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
                <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">
                  Dashboard
                </span>
              </Link>
              <Link
                href="/admin/dashboard"
                className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 transition-all duration-200"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-300 transition-colors duration-200">
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
                <span className="font-medium text-gray-700 group-hover:text-[#1a365d]">
                  Users
                </span>
              </Link>
            </div>
          </nav>
        </aside>
        {/* Page Content */}
        <main className="p-6 ml-64">{children}</main>
      </div>
    </div>
  );
}
