"use client";
import React, { useEffect, useState } from "react";
import Announcement from "@/components/announcement/Announcement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Mealmenu from "@/components/mealMenu/Mealmenu";
import Menu from "@/components/Menu";
import Rightmenu from "@/components/Rightmenu";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Postpage() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [title, setTitle] = useState("");
  const [postTime, setPostTime] = useState("");

  const getDate = (time) => {
    const date = new Date(time);
    const formatted = date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formatted;
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/post/${id}`);
        if (response.status == 200) {
          setPost(response.data.data);
          const time = getDate(response?.data?.data?.updateDate)
          setPostTime(time)
          const preTitle = response.data.data.caption
            ?.split(" ")
            ?.map(
              (item) =>
                item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
            );
          setTitle(preTitle.join(" "));
        }
      } catch (error) {
        toast.error("Lỗi bài viết!");
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    async function getBreadcrumb() {
      const List = [];
      try {
        const res = await axios.get(`/api/category?flat=1`);
        // console.log("res...........", res.data);

        let current = res.data.find((c) => c.id == post.categoryId);
        // console.log("current................",current);

        while (current) {
          List.unshift(current);
          current = res.data.find((c) => c.id == current.parent);
        }
        // console.log("current................",current);
        // console.log("current................",List);

        setBreadcrumb(List);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getBreadcrumb();
  }, [post]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-7xl flex-col items-start bg-white dark:bg-black">
        <Header></Header>
        <Menu></Menu>
        <section className="flex flex-col lg:flex-row w-full p-2 h-1/3">
          <div className="flex flex-col w-full lg:w-3/4 md:mx-5">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <img
                src="/images/icon/home-icon.png"
                alt="home"
                className="w-3 h-3"
              />
              <Link href="/" className="hover:underline">
                Trang chủ
              </Link>

              {breadcrumb?.map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                  <span>/</span>
                  <a href={`/post/${item.id}`} className="hover:underline">
                    {item.name}
                  </a>
                </span>
              ))}
            </div>
            <div className="flex flex-col font-bold text-3xl px-4 my-2">
              {post && title}
              <span className="text-sm my-1 font-normal text-gray-400">
                {post && postTime}
              </span>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: (post && post?.fulltext) || "",
              }}
            />
          </div>
          <div className="flex flex-col items-center lg:w-1/4 w-full pl-2 py-2">
            <Rightmenu></Rightmenu>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
