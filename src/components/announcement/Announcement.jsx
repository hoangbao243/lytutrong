import Link from 'next/link';
import React from 'react'

export default function Announcement() {
    const announcementData = [
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
    <div className='flex flex-col justify-start items-start w-full'>
        <div className="flex justify-center items-center mt-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-400 text-xl font-black uppercase">
            Văn Bản - Thông Báo
        </div>
        <ul className='divide-y-2 divide-gray-300'>
            {
                announcementData && announcementData?.map(item=>(
                    <li key={item.id} className='flex flex-col hover:text-blue-500 text-red-400 px-3 py-1'>
                        <Link href={`/post/${item.id}`}>{item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}</Link>
                        <span className='text-[12px] text-gray-500'>{item.createDate}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
