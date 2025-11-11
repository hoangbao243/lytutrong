import Link from "next/link";
import React from "react";

export default function Schoolnews(props) {
  const Data = props.props || [];

  return (
    <div className="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow p-2">
      <div className="flex justify-start items-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-2xl font-black uppercase">
        {props.title}
      </div>

      <div className="flex gap-2">
        <div className="clearfix">
          <Link href={`/post/${Data[0]?.id}`}>
            <img
              src={Data[0]?.image}
              alt={Data[0]?.title}
              className="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2 shadow-lg shadow-amber-200/40"
            />
            <h3 className="font-bold text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">
              {Data[0]?.title?.toUpperCase()}
            </h3>
            <p className="text-gray-700 line-clamp-4 text-sm">
              {Data[0]?.description?.charAt(0)?.toUpperCase() + Data[0]?.description?.slice(1)?.toLowerCase()}
            </p>
          </Link>
        </div>
      </div>
      <ul>
        {Data &&
          Data?.slice(1)?.map((item) => (
            <li key={item?.id} className="flex">
              <img
                className="m-1"
                src="images/icon/right-arrow.png"
                alt="right-arrow"
                width={12}
                height={12}
              />
              <h3 className="line-clamp-1 hover:text-blue-500">
                <Link href={`/post/${item?.id}`}>{item?.title?.charAt(0)?.toUpperCase() + item?.title?.slice(1)?.toLowerCase()}</Link>
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
