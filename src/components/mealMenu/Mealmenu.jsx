import Link from "next/link";
import React from "react";

export default function Mealmenu() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:my-4 justify-start items-start">
        <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
          <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
            Thực đơn
          </div>
        </div>
        <Link href={`/post/${7}`} className="w-full">
          <img
            src="/images/thuc_don_trong_tuan.jpg"
            className="w-full shadow-lg shadow-amber-200/40 rounded-xs"
            alt="thực đơn trong tuần "
          />
        </Link>
      </div>
    </div>
  );
}
