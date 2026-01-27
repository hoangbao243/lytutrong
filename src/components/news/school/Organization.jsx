import React from "react";
import Link from "next/link";
import Slideshow from "@/components/slideshow/Slideshow";
import PostCard from "@/components/postCard/PostCard";

export default function Organization(props) {
  const data = props.props || [];
  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow ">
      <div className="flex h-fit w-full justify-between items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
        <Link
          href={`/pages/category/tin-tuc-doan-doi`}
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
          <Slideshow data={data?.slice(0, 3)} height={`h-[14rem]`} bottom="bottom-4" text="text-sm" width="w-fit"></Slideshow>
        </div>
        {data &&
          data?.slice(3)?.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
