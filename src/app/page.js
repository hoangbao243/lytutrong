import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

import Menu from "@/components/Menu";
import News from "@/components/news/News";
import Rightmenu from "@/components/Rightmenu";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  <main className="flex flex-col min-h-screen w-full max-w-7xl bg-white dark:bg-black">

    <Header />
    <Menu />

    {/* RESPONSIVE MAIN LAYOUT */}
    <section className="
      flex w-full md:p-2 
      flex-col 
      lg:flex-row 
      gap-4
    ">
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

  <Footer />
</div>
  );
}
