import React from "react";

export default function ChartViews() {
  const viewsbyMonth = [
    {
      month: "Jan",
      views: 123,
    },
    {
      month: "Feb",
      views: 555,
    },
    {
      month: "Mar",
      views: 177,
    },
    {
      month: "Apr",
      views: 163,
    },
    {
      month: "May",
      views: 59,
    },
    {
      month: "Jun",
      views: 122,
    },
    {
      month: "Jul",
      views: 199,
    },
    {
      month: "Aug",
      views: 166,
    },
    {
      month: "Sep",
      views: 823,
    },
    {
      month: "Oct",
      views: 275,
    },
    {
      month: "Nov",
      views: 168,
    },
    {
      month: "Dec",
      views: 522,
    },
  ];
  const maxValue = Math.max(...viewsbyMonth.map(item => item.views));
  console.log(maxValue);
  
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center rounded-xl bg-white">
      <div className="flex justify-center items-end gap-2 p-4">
        {viewsbyMonth &&
          viewsbyMonth?.map((item, index) => {
            const height = item.views/maxValue*100;
            console.log(height);
            
            return (
              <div key={index} className="relative flex flex-col items-center">
                <p className="font-bold text-[12px] text-gray-500">{item?.views}</p>
                <div
                  className={`bg-blue-400 hover:bg-blue-600 w-8 transition-all duration-700 ease-out animate-grow rounded-t-md`}
                style={{
                "--h": `${height+30}px`,
                height: `${height+30}px`,
              }}
                />
                <p className="font-bold text-gray-600">{item?.month}</p>
              </div>
            );
          })}
      </div>
      <p className="font-bold uppercase p-1 mb-2 text-lg">Lượt xem mỗi tháng</p>
    </div>
  );
}
