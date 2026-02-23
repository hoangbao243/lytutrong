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
  //lăn lên trên cùng
  const scrollToTop = (duration = 350) => {
    const start = window.scrollY;
    const startTime = performance.now();

    // easing chậm – mềm
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutSine(progress);
      window.scrollTo(0, start * (1 - eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
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
        <div className="md:px-2">
          <Header />
        </div>
        <Menu />

        {/* RESPONSIVE MAIN LAYOUT */}
        <section className="flex h-fit w-full md:p-2 flex-col lg:flex-row gap-4">
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
        onClick={(e) => scrollToTop()}
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
