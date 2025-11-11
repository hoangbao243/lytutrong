import React from "react";
import "./News.css";
import Schoolnews from "./school/Schoolnews";

export default function News() {
  const newsData = [
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
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center p-1 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-3xl font-black uppercase">
        Tin Nổi bật
      </div>
      <div className="flex w-full justify-between items-center">
        {newsData &&
          newsData.map((item) => (
            <div key={item.id} className="card" id="card">
              <div className="content flex flex-col justify-between gap-2">
                <img
                  src={item.image}
                  alt="lytutrongnews"
                  width={150}
                  height={150}
                  className="shadow-[0px_0px_7px_4px_#58545488] scale-95 hover:scale-120 transition-transform duration-300 ease-in-out"
                />
                <div className="p-1 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] text-white">
                  {item.title}
                </div>
                <div>{item.createDate}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col w-full h-fit mt-4">
        <div className="flex w-full h-full">
          <div className="w-1/2 bg-amber-200">
            <Schoolnews props={newsData} title={"Nhà trường"}></Schoolnews>
          </div>
          <div className="w-1/2 bg-fuchsia-200">
            <Schoolnews props={newsData} title={"Hoạt động giảng dạy"}></Schoolnews>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 bg-red-300">
            <Schoolnews props={newsData} title={"Đoàn thể"}></Schoolnews>
          </div>
          <div className="w-1/2 bg-green-200">
            <Schoolnews props={newsData} title={"Các văn bản"}></Schoolnews>
          </div>
        </div>
      </div>
    </div>
  );
}
