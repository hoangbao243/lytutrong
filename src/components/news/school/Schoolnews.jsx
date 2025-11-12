import Link from "next/link";
import React from "react";

export default function Schoolnews(props) {
  const Data = props.props || [];

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow p-2">
      <div className="flex justify-start items-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-2xl font-black uppercase">
        {props.title}
      </div>

      <div className="flex flex-row grid grid-cols-2 gap-2">
        {Data &&
          Data.map((item) => (
            <div key={item?.id} className="flex w-full gap-4 h-[14rem]">
              {/* <div className="w-full bg-red-200">

              <Link href={`/post/${Data[0]?.id}`}>
                <img
                  src={Data[0]?.image}
                  alt={Data[0]?.title}
                  className="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
                />
                <h3 className="font-bold w-full text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">
                  {Data[0]?.title?.toUpperCase()}
                </h3>
                <p className="text-gray-700 w-full line-clamp-4 text-sm">
                  {Data[0]?.description?.charAt(0)?.toUpperCase() +
                    Data[0]?.description?.slice(1)?.toLowerCase()}
                </p>
              </Link>
            </div> */}
              <Link href={`/post/${item?.id}`} class="bg-white rounded-xl shadow-md p-4 overflow-hidden leading-relaxed">
                <img
                  src={item?.image}
                  alt="Thumbnail"
                  class="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
                />
                <h3 class="font-bold text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">{item?.title?.toUpperCase()}</h3>
                <p class="text-gray-600 h-full text-sm">
                  {item?.description}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
