"use client"
import React, {useState, useEffect, useRef} from "react";

export default function Fanpage() {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
    useEffect(() => {
      const w = document.getElementsByClassName("fanpage")[0].clientWidth
      const h = document.getElementsByClassName("fanpage")[0].clientHeight
      setWidth(w)
      setHeight(h)
    }
    , []);
    
  return (
    <div className=" flex flex-col h-full justify-start items-start w-full lg:mt-1">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 text-xl font-bold text-white bg-blue-400 rounded-t-xl">
          Fanpage
        </div>
      </div>
      <div className="flex md:grow max-h-88 h-60 fanpage w-full">
        <iframe
          src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHCLyTuTrong%3F_rdc%3D1%26_rdr%23&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
          width={width}
          height={height}
          className={`border-0 overflow-hidden z-999`}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
