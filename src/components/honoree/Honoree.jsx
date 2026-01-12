import Link from "next/link";
import React from "react";
import Loader2 from "../loader/Loader2";

export default function Honoree(props) {
  return (
    <>
      {
        <div className="w-full">
          <div className="flex h-fit w-full justify-start items-center border-b-2 border-red-500 text-2xl uppercase">
            <div className="w-fit p-2 font-bold text-xl text-white bg-red-500 rounded-t-xl">
              Thành tích học sinh
            </div>
          </div>
          {props?.data ? <div className="flex flex-col gap-2  w-full h-fit">
            {props.data && (
              <Link href={`/post/${props.data?.id}`} key={props.data?.id} className="w-full group cursor-pointer overflow-hidden duration-500 h-fit  bg-gray-100 p-2 gap-2">
                <div className="">
                  <div className="group-hover:scale-110 w-full h-40 duration-500 ">
                    <img src={props.data?.src} alt={props.data?.caption} className="w-full h-full rounded-xl" />
                  </div>
                  <p className="mt-1 p-1 font-medium">
                    {props.data?.caption}
                  </p>
                </div>
              </Link>
            )}
          </div> : <Loader2></Loader2>}
        </div>
      }
    </>
  );
}
