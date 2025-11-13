import React from "react";
import "./News.css";
import Schoolnews from "./school/Schoolnews";
import Schoolnews2 from "./school/Schoolnews2";

export default function News() {
  const newsData = [
    {
      id: 1,
      image: "/images/11.png",
      title:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      createDate: "01-01-2025",
      userId: 1,
      category: 1,
      description: " Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ",
      
    },
    {
      id: 2,
      image: "/images/11.png",
      title:
        "Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026",
      createDate: "01-02-2025",
      userId: 1,
      category: 1,
      description: " việc đề nghị phê duyệtphương án giá dịcọThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họ ",
    },
    {
      id: 3,
      image: "/images/11.png",
      title:
        "Kế hoạch thực hiện quy định công khai trong các hoạt động của cơ sở giáo dục, NH 2025-2026",
      createDate: "01-03-2025",
      userId: 1,
      category: 1,
      description: "Thông báo về việc ghị phê duyệt phương án giá dịch vụ năm họcThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họ đề nghị phê duyệt phương án giá dịch vụ năm họcThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họThông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm họ ",

    },
    {
      id: 4,
      image: "/images/11.png",
      title:
        "TRƯỜNG TIỂU HỌC LÝ TỰ TRỌNG HÂN HOAN CHÀO ĐÓN NĂM HỌC MỚI 2025-2026",
      createDate: "01-04-2025",
      userId: 1,
      category: 1,
      description: " Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ năm học 2025-2026 Thông báo về việc đề nghị phê duyệt phương án giá dịch vụ",

    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex h-fit w-full justify-start items-center border-b-2 border-blue-400 text-2xl uppercase mt-2">
        <div className="w-fit p-2 font-bold text-xl text-white bg-blue-400 rounded-t-xl">
          Tin nổi bật
        </div>
      </div>
      <div className="w-full justify-between items-center grid grid-cols-2 lg:grid-cols-4 gap-2">
        {newsData &&
          newsData?.map((item) => (
            <div key={item?.id} className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-fit w-full hover:shadow-xl bg-white hover:text-blue-500">
              <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
               <img
                    src={item?.image}
                    alt="lytutrongnews"
                    className="w-full h-full shadow-lg shadow-amber-100/20 rounded-lg"
                  />
              </div>

              <div className="px-5 pt-2 flex flex-col">
                <h2 className="font-semibold lg:line-clamp-4 line-clamp-3">{item?.title}</h2>
                 <span className="text-gray-600 text-[14px]">{item?.createDate}</span >
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col w-full h-fit mt-4">
        <div className="flex flex-col w-full h-full">
          <div className="w-full bg-amber-200">
            <Schoolnews props={newsData} title={"Nhà trường"}></Schoolnews>
          </div>
        </div>
        <div className="flex flex-row w-full h-full gap-2">
          <div className="w-full bg-red-300">
            <Schoolnews2 props={newsData} title={"Hoạt động giảng dạy"}></Schoolnews2>
          </div>
          <div className="w-full bg-red-300">
            <Schoolnews2 props={newsData} title={"Đoàn thể"}></Schoolnews2>
          </div>
        </div>
      </div>
    </div>
  );
}
