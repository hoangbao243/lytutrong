import Link from "next/link";
import React from "react";

export default function Honoree() {
  const honoreeData = [
    {
      id: 25,
      image: `/images/AnhTinTuc/2025/9/HS1-1.jpg`,
      name: `Nguyen Van A`,
      title: `Giải nhất toán cấp thành phố`,
      description: `...`,
    }
  ];
  return (
    <div className="w-full">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-red-500 text-2xl uppercase">
        <div className="w-fit p-2 font-bold text-xl text-white bg-red-500 rounded-t-xl">
          Thành tích học sinh
        </div>
      </div>
      <div className="flex flex-col gap-2  w-full h-fit">
        {honoreeData &&
          honoreeData.map((item) => (
            <Link href={`/post/${item?.id}`} key={item?.id} className="w-full group cursor-pointer overflow-hidden duration-500 h-fit  bg-gray-100 p-2 gap-2">
              <div className="">
                <div className="group-hover:scale-110 w-full h-40 duration-500 ">
                    <img src={item?.image} alt={item?.title} className="w-full h-full rounded-xl"/>
                </div>
                <p className="mt-1 p-1 font-medium">
                  {item?.name + " - " + item?.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
