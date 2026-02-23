import { formatDateTime } from "@/utils/date";
import { capitalizeTitle } from "@/utils/title";
import Link from "next/link";
import React from "react";
import Loader2 from "../loader/Loader2";

export default function Announcement(props) {
  return (
    <div className="flex flex-col justify-start items-start w-full mt-1">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 text-xl font-bold text-white bg-blue-400 rounded-t-xl">
          {props.title}
        </div>
      </div>
      <ul className="divide-y-2 divide-gray-300">
        {props?.announcementData[0] && props.title == "Các Văn Bản"
          ? props?.announcementData?.map((item) => (
              <li
                key={item?.id}
                className="flex hover:text-blue-500 items-center text-red-400 "
              >
                <img
                  src={item?.src}
                  alt={item?.caption}
                  className="h-22 w-24 p-1 rounded-lg"
                />
                <div className="flex flex-col">
                  <Link href={`/post/${item?.id}`} className="line-clamp-3">
                    {item.caption && capitalizeTitle(item.caption)}
                  </Link>
                  <span className="text-[12px] text-gray-500">
                    {item.publish_date && formatDateTime(item.publish_date)}
                  </span>
                </div>
              </li>
            ))
          : props?.announcementData[0] ?
            props?.announcementData?.map((item) => (
              <li
                key={item?.id}
                className="flex flex-col hover:text-blue-500 text-red-400 px-3  py-1"
              >
                <Link href={`/post/${item?.id}`} className="line-clamp-3">
                  {item.caption && capitalizeTitle(item.caption)}
                </Link>
                <span className="text-[12px] text-gray-500">
                  {item.publish_date && formatDateTime(item.publish_date)}
                </span>
              </li>
            )) : <Loader2></Loader2>}
      </ul>
    </div>
  );
}
