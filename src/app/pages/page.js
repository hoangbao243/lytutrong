"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Menu from "@/components/Menu";
import News from "@/components/news/News";
import Rightmenu from "@/components/Rightmenu";
import { useState, useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col min-h-screen items-center md:mt-2 justify-center bg-zinc-50 font-sans dark:bg-black">
      a
    </div>
  );
}
