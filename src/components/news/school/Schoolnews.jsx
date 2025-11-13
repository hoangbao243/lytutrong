import Link from "next/link";
import React from "react";

export default function Schoolnews(props) {
  const Data = props.props || [];

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow pb-3">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
      </div>

      <div className="flex flex-row grid grid-cols-2 gap-2">
        {Data &&
          Data.map((item) => (
            <div key={item?.id} className="flex w-full gap-4 h-[14rem]">
              <Link href={`/post/${item?.id}`} className="bg-white rounded-xl shadow-md p-4 overflow-hidden leading-relaxed">
                <img
                  src={item?.image}
                  alt="Thumbnail"
                  className="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
                />
                <h3 className="font-bold text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">{item?.title?.toUpperCase()}</h3>
                <p className="text-gray-600 h-full text-sm">
                  {item?.description}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
