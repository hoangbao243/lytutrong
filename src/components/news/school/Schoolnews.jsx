import React from "react";

export default function Schoolnews() {
  const newsData = [
    {
      id: 1,
      image: "images/11.png",
      title:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      createDate: "01-01-2025",
      description:
        "TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026 TẬP HUẤN PHÒNG CHÁY CHỮA CHÁY & CỨU NẠN CỨU HỘ NĂM HỌC 2025 - 2026",
      userId: 1,
      category: 1,
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
    <div class="w-full h-full flex flex-col justify-start gap-2 bg-neutral-50 shadow p-2">
      <div class="flex gap-2">
        <div className="clearfix">
          <img
            src={newsData[0].image}
            alt={newsData[0].title}
            className="float-left w-40 h-28 object-cover rounded-lg mr-3 mb-2"
          />
          <h3 className="font-bold text-blue-700 hover:underline line-clamp-2 text-sm md:text-base">
            {newsData[0].title}
          </h3>
          <p className="text-gray-700 line-clamp-4 text-sm">
            {newsData[0].description}
          </p>
        </div>
      </div>
      <ul>
        {newsData &&
          newsData?.slice(1)?.map((item) => (
            <li>
              <h3 className="line-clamp-1">{item.title}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
