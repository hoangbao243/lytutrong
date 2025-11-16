import React from "react";

export default function Fanpage() {
  return (
    <div className="flex flex-col justify-start items-start w-full lg:mt-4">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase">
        <div className="w-fit p-2 text-xl font-bold text-white bg-blue-400 rounded-t-xl">
          Fanpage
        </div>
      </div>
      <div className="w-full h-54">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FHCLyTuTrong%3F_rdc%3D1%26_rdr%23&tabs=timeline&width=308&height=216&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="308"
          height="216"
          className="border-0 overflow-hidden"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
