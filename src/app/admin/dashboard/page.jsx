"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import DriveStorage from "./components/DriveStorage";
import TopViewPost from "./components/TopPosts";

export default function Dashboard() {
  const [topPosts, setTopPosts] = useState([])
  const [topNewPosts, setTopNewsPost] = useState([])
    useEffect(() => {
      const getTopViewPost = async () => {
        const res = await axios.get(`/api/post/topviews`);
        if (res.status == 200) {
          setTopPosts(res?.data?.data)
        }
        console.log(res);
      };
      const getTopNewPost = async () =>{
        const res = await axios.get(`/api/post/topnew`)
        if (res.status == 200) {
          setTopNewsPost(res?.data?.data)
        }
      }
      getTopViewPost();
      getTopNewPost()
    }, []);

  return (
    <div className="flex w-full justify-start ">
      <div className="flex flex-col h-fit gap-2 w-1/3 p-4">
        <DriveStorage></DriveStorage>
        <div className="w-full h-25 p-4 bg-blue-400 rounded-xl">
          Đăng nhập gần đây
        </div>
      </div>
      <div className="flex flex-col gap-2 w-2/3 h-fit p-4 rounded-xl">
        <TopViewPost data={topPosts} title={`Top 5 bài viết nhiều lượt xem`}></TopViewPost>
        <TopViewPost data={topNewPosts} title={`Top 5 bài viết mới nhất`}></TopViewPost>
      </div>
    </div>
  );
}
