import React from "react";
import Slideshow from "@/components/slideshow/Slideshow";

export default function Main() {
  const slides = [
      {
          id: 1,
          src: '/images/banner.png',
          alt: 'Slide banner lytutrong',
          caption: 'TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026'
      },
      {
          id: 2,
          src: '/images/banner.png',
          alt: 'Slide banner lytutrong',
          caption: 'bbb'
      },
      {
          id: 3,
          src: '/images/banner.png',
          alt: 'Slide banner lytutrong',
          caption: 'ccc'
      }
  ]
  return (
    <div className="w-full">
      <Slideshow data={slides}></Slideshow>
    </div>
  );
}
