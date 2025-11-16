import React from "react";
import Link from "next/link";
import Slideshow from "@/components/slideshow/Slideshow";

export default function Organization(props) {
  const data = props.props || [];
  const slides = [
    {
      id: 1,
      src: "/images/banner.png",
      alt: "Slide banner lytutrong",
      caption:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
    },
    {
      id: 2,
      src: "/images/banner.png",
      alt: "Slide banner lytutrong",
      caption: "bbb",
    },
    {
      id: 3,
      src: "/images/banner.png",
      alt: "Slide banner lytutrong",
      caption: "ccc",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow ">
      <div className="flex h-fit w-full justify-between items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
        <Link
          href={`#`}
          className="flex text-[14px] capitalize text-gray-400 font-medium mt-4 mr-4"
        >
          <img
            src="/images/icon/arrow-down-2.png"
            className="w-3 h-3 mt-1 mr-1 "
            alt="see-more"
          />
          xem thêm...
        </Link>
      </div>

      <div className=" grid grid-cols-2 gap-2">
        <div className="h-56 w-full col-span-2 flex transition-transform duration-700 ease-in-out rounded-lg my-2">
          <Slideshow data={slides} height={`h-[14rem]`}></Slideshow>
        </div>
        {data &&
          data.slice(2)?.map((item) => (
            <div
              key={item?.id}
              className="flex w-full gap-2 h-[15rem] cursor-pointer transition-all duration-500 hover:translate-y-2 bg-neutral-50 rounded-lg shadow-xlitems-center justify-evenly"
            >
              <Link
                href={`/post/${item?.id}`}
                className="flex flex-col bg-white rounded-xl shadow-md p-2 overflow-hidden leading-relaxed"
              >
                <img
                  src={item?.image}
                  alt="Thumbnail"
                  className="float-left w-full h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
                />
                <h3 className="font-medium text-black hover:text-blue-500 line-clamp-4 text-sm md:text-base">
                  {item?.title?.charAt(0)?.toUpperCase() +
                    item?.title?.slice(1)?.toLowerCase()}
                </h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
