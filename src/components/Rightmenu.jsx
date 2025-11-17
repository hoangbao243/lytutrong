import React from "react";
import Imagelibrary from "./imageLibrary/Imagelibrary";
import Mealmenu from "@/components/mealMenu/Mealmenu";
import Announcement from "@/components/announcement/Announcement";
import Honoree from "./honoree/Honoree";
import Fanpage from "./fanpage/Fanpage";

export default function Rightmenu() {
  const data = [
    {
      id: 31,
      src: "/images/11.png",
      caption:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      createDate: "01-01-2025",
      userId: 1,
      categoryId: 3,
      description:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
    },
    {
      id: 32,
      src: "/images/11.png",
      caption:
        "Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026",
      createDate: "01-02-2025",
      userId: 1,
      categoryId: 3,
    },
    {
      id: 33,
      src: "/images/11.png",
      caption:
        "Kế hoạch thực hiện quy định công khai trong các hoạt động của cơ sở giáo dục, NH 2025-2026",
      createDate: "01-03-2025",
      userId: 1,
      categoryId: 3,
    },
    {
      id: 34,
      src: "/images/11.png",
      caption:
        "TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG HÂN HOAN CHÀO ĐÓN NĂM HỌC MỚI 2025-2026",
      createDate: "01-04-2025",
      userId: 1,
      categoryId: 3,
    },
    {
      id: 35,
      src: "/images/AnhTinTuc/2025/9/KG-1.jpg",
      caption:
        "Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026",
      createDate: "01-02-2025",
      userId: 1,
      categoryId: 4,
    },
    {
      id: 36,
      src: "/images/AnhTinTuc/2025/9/KG-2.jpg",
      caption:
        "Kế hoạch thực hiện quy định công khai trong các hoạt động của cơ sở giáo dục, NH 2025-2026",
      createDate: "01-03-2025",
      userId: 1,
      categoryId: 4,
    },
    {
      id: 37,
      src: "/images/AnhTinTuc/2025/9/KG-3.jpg",
      caption:
        "TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG HÂN HOAN CHÀO ĐÓN NĂM HỌC MỚI 2025-2026",
      createDate: "01-04-2025",
      userId: 1,
      categoryId: 4,
    },
  ];
  return (
    <div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-1">
        <Honoree></Honoree>
        <Imagelibrary></Imagelibrary>
        <Announcement
          announcementData={data?.filter((item) => item.categoryId == 3)}
          title={`Văn Bản - Thông Báo`}
        ></Announcement>
        <Mealmenu></Mealmenu>
        <Announcement
          announcementData={data?.filter((item) => item.categoryId == 4)}
          title={`Các Văn Bản`}
        ></Announcement>
        <Fanpage></Fanpage>
      </div>
    </div>
  );
}
