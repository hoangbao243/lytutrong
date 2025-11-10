import Link from "next/link";
import React from "react";

export default function Imagelibrary() {
  return (
    <div className="flex flex-col w-full">
      <div className="mt-5 ">
        <Link href={"#"}>
          <img src="images/thuvienanh.png" alt="Thư Viện Ảnh" />
        </Link>
      </div>
    </div>
  );
}
