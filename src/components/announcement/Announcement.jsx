import Link from "next/link";
import React from "react";

export default function Announcement(props) {
  const announcementData = props.announcementData;

  return (
    <div className="flex flex-col justify-start items-start w-full">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 text-xl font-bold text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
      </div>
      <ul className="divide-y-2 divide-gray-300">
        {announcementData && props.title == "Các Văn Bản"
          ? announcementData?.map((item) => (
              <li
                key={item?.id}
                className="flex hover:text-blue-500 items-center text-red-400 "
              >
                <img
                  src={item?.image}
                  alt={item?.title}
                  className="h-22 w-24 p-1 rounded-lg"
                />
                <div className="flex flex-col">
                  <Link href={`/post/${item?.id}`} className="line-clamp-3">
                    {item?.title?.charAt(0)?.toUpperCase() +
                      item?.title?.slice(1)?.toLowerCase()}
                  </Link>
                  <span className="text-[12px] text-gray-500">
                    {item.createDate}
                  </span>
                </div>
              </li>
            ))
          : announcementData &&
            announcementData?.map((item) => (
              <li
                key={item?.id}
                className="flex flex-col hover:text-blue-500 text-red-400 px-3  py-1"
              >
                <Link href={`/post/${item?.id}`} className="line-clamp-3">
                  {item?.title?.charAt(0)?.toUpperCase() +
                    item?.title?.slice(1)?.toLowerCase()}
                </Link>
                <span className="text-[12px] text-gray-500">
                  {item.createDate}
                </span>
              </li>
            ))}
      </ul>
    </div>
  );
}
