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

export default function Postpage() {
  const [post, setPost] = useState();
  const { id } = useParams();
  const [breadcrumb, setBreadcrumb] = useState(null);
  const [title, setTitle] = useState("");

  const getPost = async () => {
    const response = await axios.get(`/api/post/${id}`);
    if (response.status == 200) {
      setPost(response.data.data);
      const preTitle = response.data.data.caption
        ?.split(" ")
        ?.map(
          (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        );
      setTitle(preTitle.join(" "));
    } else {
      setPost({
        id: 1,
        title: 'Cuộc thi "Trạng nhi Tiếng Anh" cấp Thành phố',
        image: "/images/slide1.jpg",
        createDate: "2025-09-01",
        description:
          '<p style="text-align: justify;">&nbsp; &nbsp; &nbsp;<span style="font-family: arial, helvetica, sans-serif; font-size: 14pt;">Sáng nay, ngày 27 tháng 01 năm 2018, tại đấu trường “Trạng nhí tiếng Anh” do Sở giáo dục và Đào tạo Đà Nẵng phối hợp với công ty cổ phần giáo dục Victoria tổ chức, 4 em học sinh lớp Hai của nhà trường đã xuất sắc giành 2 giải Trạng nguyên (em Minh Hiếu, Lân Hùng), 1 giải Nhất (em Trung Kiên) và 1 giải Ba (em Minh Thư). Chúc mừng các em, chúc các em có thêm nhiều thành tích mới và phát huy hơn nữa khả năng học ngoại ngữ của mình nhé.&nbsp;</span></p>\r\n<p style="text-align: justify;"><img src="/images/AnhTinTuc/2018/01/Trangnhi.jpg" border="0" alt="" /></p>\r\n<p style="text-align: justify;">&nbsp;<img src="/images/AnhTinTuc/2018/01/Trangnhi2.jpg" border="0" alt="" /></p>\r\n<p style="text-align: justify;">&nbsp;<img src="/images/AnhTinTuc/2018/Trangnhi3.jpg" border="0" alt="" /></p>\r\n<p style="text-align: justify;">&nbsp;<img src="/images/AnhTinTuc/2018/01/Trangnhi1.jpg" border="0" alt="" /></p>\r\n<p style="text-align: justify;">&nbsp;</p>\r\n<p style="text-align: justify;">&nbsp;</p>',
      });
    }
  };
  useEffect(() => {
    getPost();
  }, [id]);

  useEffect(() => {
    async function getBreadcrumb() {
      const List = [];
      try {
        const res = await axios.get(`/api/category`);
        let current = res.data.data.find((c) => c.id === post.categoryId);
        while (current) {
          List.unshift(current);
          current = res.data.data.find((c) => c.id === current.parent);
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
        <Header></Header>
        <Menu></Menu>
        <section className="flex flex-col lg:flex-row w-full p-2 h-1/3">
          <div className="flex flex-col w-full lg:w-3/4 md:mx-5">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <img src="/images/icon/home-icon.png" alt="home"  className="w-3 h-3"/>
              <Link href="/" className="hover:underline">
                Trang chủ
              </Link>

              {breadcrumb?.map((item, index) => (
                <span key={item.id} className="flex items-center gap-1">
                  <span>/</span>
                  <a href={`/post/${item.id}`} className="hover:underline">
                    {item.name}
                  </a>
                </span>
              ))}
            </div>
            <div className="flex flex-col font-bold text-3xl mx-auto px-4 my-4">
              {post && title}
              <span className="text-sm my-1 font-normal text-gray-400">{post && post?.createDate}</span>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: (post && post?.description) || "",
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
