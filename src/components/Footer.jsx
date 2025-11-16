import Link from "next/link";
import React from "react";

export default function Footer() {
  const views = 2025;
  const digits = views.toString().split("");
  return (
    <footer className="flex flex-col justify-center mx-auto md:flex-row bg-[#e4eeed] h-30 min-h-fit w-full m-2 mb-4 max-w-7xl rounded-lg border border-gray-300">
      <img
        src="/images/logo2.png"
        className="w-30 h-30 mx-auto md:mx-0"
        alt="Logo"
      />
      <div className="flex w-fit md:w-110">
        <div className="flex flex-col justify-center items-start ml-2 ">
          <span className="mx-auto md:mx-0">
            Trưởng ban biên tập:{" "}
            <span className="text-emerald-600">
              Cô Trần Thị Lệ - Hiệu Trưởng
            </span>
          </span>
          <span className="mx-2 md:mx-0">
            Bản quyền © 2025 Trường Tiểu Học Lý Tự Trọng - Đà Nẵng
          </span>
          <span className="hidden md:inline mx-auto md:mx-0">
            Thiết kế bởi{" "}
            <Link
              href={`https://thietkewebtv.com/`}
              target="_blank"
              className="text-emerald-600 font-bold"
            >
              IT Trí Việt
            </Link>
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-start md:w-82.5">
        <p className="uppercase text-[#19908e] font-bold md:mb-2 mx-auto md:mx-0">
          Thông tin liên hệ
        </p>
        <span className="mx-auto md:mx-0">
          Địa chỉ: 12 lý tự trọng, P.Hải Châu, TP Đà Nẵng
        </span>
        <span className="mx-auto md:mx-0">Số điện thoại: 0985.145.906</span>
      </div>
      <div className="flex flex-col w-full justify-center items-center md:w-68">
        <p className="uppercase text-[#19908e] font-bold mb-2 mx-auto md:mx-0">
          Lượng truy cập website
        </p>
        <div className="flex  gap-0.5">
          {digits.map((digit, index) => (
            <div
              key={index}
              className="relative drop-shadow-xl w-8 h-12 overflow-hidden rounded-lg bg-[#3d3c3d]"
            >
              <div className="font-bold text-4xl flex items-start justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
                {digit}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="md:hidden text-center w-full mt-2">
        Thiết kế bởi{" "}
        <Link
          href={`https://thietkewebtv.com/`}
          target="_blank"
          className="text-emerald-600 font-bold"
        >
          IT Trí Việt
        </Link>
      </p>
    </footer>
  );
}
