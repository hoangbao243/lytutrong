import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [footer, setFooter] = useState([])
  const [views, setViews] = useState(0)
  const digits = views.toString().split("");

  useEffect(()=>{
    const getData = async () =>{
      try {
        const res = await axios.get(`/api/footer`)
        if (res.status == 200) {
          setFooter(res?.data?.rows[0])
        }
      } catch (error) {
        toast.error(error)
      }
    }
    const getView = async () =>{
      try {
        const res2 = await axios.get(`/api/views`)
        if (res2.status == 200) {
          setViews(res2.data[0].total)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    getView()
    getData()
  },[])

  return (
    <footer className="flex flex-col justify-center mx-auto md:flex-row bg-[#e4eeed] md:h-30 h-full w-full m-2 mb-4 max-w-7xl rounded-lg border border-gray-300">
      <img
        src="/images/logo2.png"
        className="w-30 h-30 mx-auto md:mx-0"
        alt="Logo"
      />
      <div className="flex justify-center w-fit mx-auto md:mx-0 md:w-108">
        <div className="flex flex-col justify-center items-center ml-2 mx-auto ">
          <span className="mx-auto md:mx-0">
            Trưởng ban biên tập:{" "}
            <span className="text-emerald-600">
              {footer.principal} - Hiệu Trưởng
            </span>
          </span>
          <span className="mx-2 md:mx-0">
            Bản quyền © {footer.year} Trường Tiểu Học Lý Tự Trọng - Đà Nẵng
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
      <p className="w-2/3 h-0.5 md:w-0.5 md:h-2/3 md:my-auto md:mx-1 mx-auto my-1 bg-emerald-500"></p>
      <div className="flex flex-col w-full justify-center items-start md:w-82.5 lg:ml-2">
        <p className="uppercase text-[#19908e] font-bold md:mb-2 mx-auto md:mx-0">
          Thông tin liên hệ
        </p>
        <span className="mx-auto md:mx-0">
          Địa chỉ: {footer.address}
        </span>
        <span className="mx-auto md:mx-0">Số điện thoại: {footer.phone}</span>
      </div>
      <p className="w-0 h-0 md:w-0.5 md:h-2/3 md:my-auto md:mx-1 mx-auto my-1 bg-emerald-500"></p>

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
