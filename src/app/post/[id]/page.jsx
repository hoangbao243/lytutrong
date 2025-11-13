"use client"
import React, { useEffect, useState } from 'react'
import Announcement from "@/components/announcement/Announcement";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Mealmenu from "@/components/mealMenu/Mealmenu";
import Menu from "@/components/Menu";
import Rightmenu from "@/components/Rightmenu";
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Postpage() {
  const [post,setPost] = useState()
  const { id } = useParams()

  const getPost = async () =>{
    const response = await axios.get(`http://localhost:3000/api/post/${id}`,)
    if (response.status == 200) {
      setPost(response.data.data)
    }else{
      setPost({ id: 1, title: "Cuộc thi \"Trạng nhi Tiếng Anh\" cấp Thành phố", image: "/images/slide1.jpg", createDate: "2025-09-01", description: "<p style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp;<span style=\"font-family: arial, helvetica, sans-serif; font-size: 14pt;\">Sáng nay, ngày 27 tháng 01 năm 2018, tại đấu trường “Trạng nhí tiếng Anh” do Sở giáo dục và Đào tạo Đà Nẵng phối hợp với công ty cổ phần giáo dục Victoria tổ chức, 4 em học sinh lớp Hai của nhà trường đã xuất sắc giành 2 giải Trạng nguyên (em Minh Hiếu, Lân Hùng), 1 giải Nhất (em Trung Kiên) và 1 giải Ba (em Minh Thư). Chúc mừng các em, chúc các em có thêm nhiều thành tích mới và phát huy hơn nữa khả năng học ngoại ngữ của mình nhé.&nbsp;</span></p>\r\n<p style=\"text-align: justify;\"><img src=\"/images/AnhTinTuc/2018/01/Trangnhi.jpg\" border=\"0\" alt=\"\" /></p>\r\n<p style=\"text-align: justify;\">&nbsp;<img src=\"/images/AnhTinTuc/2018/01/Trangnhi2.jpg\" border=\"0\" alt=\"\" /></p>\r\n<p style=\"text-align: justify;\">&nbsp;<img src=\"/images/AnhTinTuc/2018/Trangnhi3.jpg\" border=\"0\" alt=\"\" /></p>\r\n<p style=\"text-align: justify;\">&nbsp;<img src=\"/images/AnhTinTuc/2018/01/Trangnhi1.jpg\" border=\"0\" alt=\"\" /></p>\r\n<p style=\"text-align: justify;\">&nbsp;</p>\r\n<p style=\"text-align: justify;\">&nbsp;</p>" })
    }
  }
  useEffect(()=>{
    getPost()
  },[id])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <Header></Header>
          <main className="flex min-h-screen w-full max-w-6xl flex-col items-start bg-white dark:bg-black">
            <Menu></Menu>
            <section className="flex w-full p-2 h-1/3">
              <div className="flex flex-col w-3/4">
                <div dangerouslySetInnerHTML={{ __html: post && post?.description || "" }} />
              </div>
              <div className="flex flex-col items-center w-1/4 pl-2 py-2">
                <Rightmenu></Rightmenu>
              </div>
            </section>
          </main>
          <Footer></Footer>
        </div>
  )
}
