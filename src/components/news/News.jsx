import React, { useEffect, useState } from "react";
import "./News.css";
import Schoolnews from "./school/Schoolnews";
import Schoolnews2 from "./school/Schoolnews2";
import Link from "next/link";
import Organization from "./school/Organization";
import axios from "axios";
import { formatDateTime } from "@/utils/date";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [schoolNews, setSchoolNews] = useState([]);
  const [teachActiv, setTeachActiv] = useState([]);
  const [organiNews, setOrganiNews] = useState([]);

  useEffect(() => {
    //api gọi bài viết nổi bật
    const getNewsData = async () => {
      const res = await axios.get(`/api/post/featured`);
      if (res.status == 200) {
        setNewsData(res?.data?.data);
      }
    };
    //api gọi tin nhà trường
    const getSchoolNews = async () => {
      const res = await axios.get(`/api/post/by-category-name`, {
        params: {
          name: "Các hoạt động",
          limit: 6
        },
      });
      if (res.status == 200) {
        setSchoolNews(res?.data?.data);
      }
    };
    //api gọi hoạt động giảng dạy
    const getTeachActiv = async () => {
      const res = await axios.get(`/api/post/by-category-name`, {
        params: {
          name: "Hoạt động giảng dạy",
          limit: 4
        },
      });
      if (res.status == 200) {
        setTeachActiv(res?.data?.data);
      }
    };
    //api gọi tin tức đoàn đội
    const getOrganiNews = async () => {
      const res = await axios.get(`/api/post/by-category-name`, {
        params: {
          name: "Đoàn thể",
          limit: 5
        },
      });
      if (res.status == 200) {
        setOrganiNews(res?.data?.data);
      }
    };
    getOrganiNews()
    getNewsData();
    getSchoolNews();
    getTeachActiv()
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex h-fit w-full justify-between items-center border-b-2 border-red-500 text-2xl uppercase mt-2">
        <div className="w-fit p-2 font-bold text-xl text-white bg-red-500 rounded-t-xl">
          Tin nổi bật
        </div>
        <Link
          href={`/pages/category/tin-noi-bat`}
          className="flex text-[14px] capitalize text-gray-400 font-medium mt-4 mr-4"
        >
          <img
            src="/images/icon/arrow-down-2.png"
            className="w-3 h-3 mt-1 mr-1 "
            alt="see-more"
          />
          xem thêm...
        </Link>
      </div>
      <div className="w-full justify-between items-center grid grid-cols-2 lg:grid-cols-4 gap-2">
        {newsData &&
          newsData?.map((item) => (
            <Link
              href={`/post/${item.id}`}
              key={item?.id}
              className="flex flex-col justify-between transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-68 w-full hover:shadow-xl bg-white hover:text-blue-500"
            >
              <div className="bg-linear-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg">
                <img
                  src={item?.src}
                  alt="lytutrongnews"
                  className="w-full h-full shadow-lg shadow-amber-100/20 rounded-lg"
                />
                <h2 className="px-2 pt-2 font-semibold lg:line-clamp-4 line-clamp-3">
                  {item?.caption?.charAt(0)?.toUpperCase() +
                    item?.caption?.slice(1)?.toLowerCase()}
                </h2>
              </div>

              <span className="text-gray-600 text-[14px] ml-4 my-1">
                {item?.publish_date && formatDateTime(item?.publish_date)}
              </span>
            </Link>
          ))}
      </div>
      <div className="flex flex-col w-full h-fit mt-4">
        <div className="flex flex-col w-full h-full">
          <div className="w-full ">
            <Schoolnews
              props={schoolNews}
              title={"Tin tức nhà trường"}
            ></Schoolnews>
          </div>
          <div className="w-full h-fit  my-4">
            <img src="/images/mid-banner.jpg" className="w-full" alt="" />
          </div>
        </div>
        <div className="flex md:flex-row flex-col w-full h-full gap-2">
          <div className="w-full ">
            <Schoolnews2
              props={teachActiv}
              title={"Hoạt động giảng dạy"}
            ></Schoolnews2>
          </div>
          <div className="w-full ">
            <Organization
              props={organiNews}
              title={"Tin tức Đoàn - Đội"}
            ></Organization>
          </div>
        </div>
      </div>
    </div>
  );
}
