import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./Imagelibrary.css";

export default function Imagelibrary() {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center items-center uppercase m-4 pt-2 w-full h-1/4 font-medium text-[1.5rem]">
        <div className="wrapper-grid">
          <div className="cube">
            <div className="face face-front">T</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">H</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">Ư</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">V</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">I</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">Ệ</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>

          <div className="cube">
            <div className="face face-front">N</div>
            <div className="face face-back"></div>
            <div className="face face-right"></div>
            <div className="face face-left"></div>
            <div className="face face-top"></div>
            <div className="face face-bottom"></div>
          </div>
        </div>
      </div>
      <div className=" h-3/4 mt-5 ">
        <Link href={"#"}>
          <img src="images/thuvienanh.png" alt="Thư Viện Ảnh" />
        </Link>
      </div>
    </div>
  );
}
