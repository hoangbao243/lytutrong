"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Rightmenu from "@/components/Rightmenu";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import AnotherPosts from "@/components/list-another-posts/AnotherPosts";
import { capitalizeTitle, formatDateTime } from "@/utils";

export default function Postpage() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [listPosts,setListPosts] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/post/${id}`);
        if (res.status == 200) {
          setPost(res.data.data);
          //lấy các bài viết khác
          const res1 = await axios.get(`/api/post/category/${res.data.data.categoryId}`);
          if (res1.status == 200) {
            setListPosts(res1.data.data)
          }
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
        let current = res.data.find((c) => c.id == post?.categoryId);
        while (current) {
          List.unshift(current);
          current = res.data.find((c) => c.id == current.parent);
        }
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
        <div className="w-full md:px-2 bg-transparent">
          <Header></Header>
        </div>
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
            <div className="flex flex-col font-bold text-3xl px-4 my-2 mt-4">
              {post && capitalizeTitle(post?.caption)}
              <span className="text-sm my-1 font-normal text-gray-400">
                {post && formatDateTime(post?.createDate)}
              </span>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: (post && post?.fulltext) || "",
              }}
            />
            <div className="mt-4 text-xl">
              <h3>Các bài khác: </h3>
              {listPosts && <AnotherPosts data={listPosts}></AnotherPosts>}
            </div>
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
