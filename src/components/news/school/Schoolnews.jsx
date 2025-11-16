"use client";
import React, { useEffect, useState } from "react";
import Slideshow from "@/components/slideshow/Slideshow";
import Link from "next/link";

export default function Schoolnews(props) {
  const Data = props.props || [];
  const slides = [
    {
      id: 1,
      src: "/images/banner.png",
      alt: "Slide banner lytutrong",
      caption: "aaaa",
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
  const [sliceCount, setSliceCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliceCount(2); // dưới md
      } else {
        setSliceCount(1); // md trở lên
      }
    };

    handleResize(); // chạy 1 lần khi load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow pb-3">
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

      <div className="flex flex-row grid grid-cols-2 gap-2">
        <div className="h-56 w-full flex transition-transform duration-700 ease-in-out rounded-lg md:col-span-1 col-span-2">
          <Slideshow data={slides} height="h-56"></Slideshow>
        </div>
        {Data &&
          Data.slice(sliceCount).map((item) => (
            <div key={item?.id} className="flex w-full gap-4 h-[14rem]">
              <Link
                href={`/post/${item?.id}`}
                className="bg-white rounded-xl shadow-md p-4 overflow-hidden leading-relaxed"
              >
                <img
                  src={item?.image}
                  alt="Thumbnail"
                  className="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
                />
                <h3 className="font-bold text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">
                  {item?.title?.charAt(0)?.toUpperCase() +
                    item?.title?.slice(1)?.toLowerCase()}
                </h3>
                <p className="text-gray-600 h-full text-sm text-justify [text-align-last:start] [hyphens:auto] [word-spacing:0.01em] leading-relaxed">
                  {item?.description}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
