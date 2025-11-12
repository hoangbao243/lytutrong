import Link from "next/link";
import React from "react";

export default function Imagelibrary() {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col mt-5 justify-start items-start">
        <div className="flex justify-center items-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-xl font-black uppercase">
            Thư viện ảnh
        </div>
        <Link href={"#"} className="w-full p-2">
          <img src="/images/thuvienanh.png" className="w-full shadow-lg shadow-amber-200/40" alt="Thư Viện Ảnh" />
        </Link>
      </div>
    </div>
  );
}
