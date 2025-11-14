import React from "react";
import Imagelibrary from "./imageLibrary/Imagelibrary";
import Mealmenu from "@/components/mealMenu/Mealmenu";
import Announcement from "@/components/announcement/Announcement";
import Honoree from "./honoree/Honoree";
import Fanpage from "./fanpage/Fanpage";

export default function Rightmenu() {
  const data = [
    {
      id: 1,
      image: "images/11.png",
      title:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      createDate: "01-01-2025",
      userId: 1,
      category: 1,
      description:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
    },
    {
      id: 2,
      image: "images/11.png",
      title:
        "Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026",
      createDate: "01-02-2025",
      userId: 1,
      category: 1,
    },
    {
      id: 3,
      image: "images/11.png",
      title:
        "Kế hoạch thực hiện quy định công khai trong các hoạt động của cơ sở giáo dục, NH 2025-2026",
      createDate: "01-03-2025",
      userId: 1,
      category: 1,
    },
    {
      id: 4,
      image: "images/11.png",
      title:
        "TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG HÂN HOAN CHÀO ĐÓN NĂM HỌC MỚI 2025-2026",
      createDate: "01-04-2025",
      userId: 1,
      category: 1,
    },
  ];
  return (
    <div>
      <div className="w-full ">
        <Honoree></Honoree>
        <Imagelibrary></Imagelibrary>
        <Announcement announcementData={data} title={`Văn Bản - Thông Báo`}></Announcement>
        <Mealmenu></Mealmenu>
        <Announcement announcementData={data} title={`Các Văn Bản`}></Announcement>
        <Fanpage></Fanpage>
      </div>
    </div>
  );
}
