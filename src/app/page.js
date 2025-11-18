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
      <main className="flex flex-col min-h-screen w-full max-w-7xl bg-white dark:bg-black">
        <Header />
        <Menu />

        {/* RESPONSIVE MAIN LAYOUT */}
        <section
          className="flex w-full md:p-2 flex-col lg:flex-row gap-4"
        >
          {/* LEFT: MAIN + NEWS */}
          <div className="flex flex-col w-full lg:w-3/4">
            <Main />
            <News />
          </div>

          {/* RIGHT: RIGHTMENU */}
          <div className="flex flex-col items-center w-full lg:w-1/4">
            <Rightmenu />
          </div>
        </section>
      </main>

      <div
        onClick={scrollToTop}
        className={`fixed bottom-6 right-3 z-50 p-3 rounded-full bg-[#7cbf96c7] text-white shadow-xl transition-all duration-300 hover:bg-[#7cbf96] ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <img src="/images/icon/up-arrow.png" className="w-4 h-4"></img>
      </div>
      <Footer />
    </div>
  );
}
