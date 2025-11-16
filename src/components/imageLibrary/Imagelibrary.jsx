import Link from "next/link";
import React from "react";

export default function Imagelibrary() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col lg:mt-1 justify-start items-start">
        <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
          <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
            Thư viện ảnh
          </div>
        </div>
        <Link href={"#"} className="w-full p-2">
          <img
            src="/images/thuvienanh.png"
            className="w-full shadow-lg shadow-amber-200/40"
            alt="Thư Viện Ảnh"
          />
        </Link>
      </div>
    </div>
  );
}
