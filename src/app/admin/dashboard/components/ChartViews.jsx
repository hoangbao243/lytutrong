"use client";
import Loader from "@/components/loader/Loader";
import { monthToText } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ChartViews() {
  const [viewsData, setViewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const CurreYear = new Date().getFullYear()
  useEffect(() => {
    const getViewsData = async () => {
      try {
        const res = await axios.get(`/api/views/bymonth`);
        if (res.status == 200) {
          console.log("yeardddddddddđ",res.data);
          setViewsData(res?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getViewsData();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col justify-center items-center rounded-xl bg-white shadow-lg p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Wrapper cho scroll ngang trên mobile */}
          <div className="w-full overflow-x-auto">
            <div className="flex justify-center items-end gap-3 min-w-max">
              {viewsData &&
                viewsData?.map((item, index) => {
                  const maxValue = Math.max(
                    ...viewsData.map((item) => item.views)
                  );
                  const height = (item.views / maxValue) * 100;

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-center"
                    >
                      <p className="font-bold text-[10px] sm:text-xs text-gray-500">
                        {item?.views}
                      </p>

                      <div
                        className="bg-blue-400 hover:bg-blue-600 w-3 sm:w-4 md:w-6 transition-all duration-700 ease-out animate-grow rounded-t-md"
                        style={{
                          height: `${height + 30}px`,
                        }}
                      />

                      <p className="font-bold text-gray-600 text-[10px] sm:text-xs">
                        {monthToText(item?.month)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          <p className="font-bold uppercase p-1 mt-3 text-sm sm:text-lg">
            Lượt xem năm {CurreYear}
          </p>
        </>
      )}
    </div>
  );
}
