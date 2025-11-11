import Link from "next/link";
import React from "react";

export default function Mealmenu() {
  return (
    <div className="w-full my-2 p-4 ">
      <Link href={`post/7`}>
        <img
          src="images/thuc_don_trong_tuan.jpg"
          className="w-full shadow-lg shadow-amber-200/40"
          alt="thực đơn trong tuần "
        />
      </Link>
    </div>
  );
}
