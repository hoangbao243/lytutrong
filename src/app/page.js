import Header from "@/components/Header";
import Imagelibrary from "@/components/imageLibrary/Imagelibrary";
import Menu from "@/components/Menu";
import News from "@/components/news/News";
import Slideshow from "@/components/slideshow/Slideshow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center bg-white dark:bg-black sm:items-start">
        <Header></Header>
        <Menu></Menu>
        <section className="flex w-full p-4 h-1/3">
          <div className="w-3/4 bg-red-300 m-2">
            <Slideshow></Slideshow>
          </div>
          <div className="w-1/4  m-2">
            <Imagelibrary></Imagelibrary>
          </div>
        </section>
        <section className="flex w-full h-1/3 ">
          <div className="flex flex-col w-3/4 m-2">
            <div className="flex w-full  justify-center items-center">
              <News></News>
            </div>
            <div className="flex bg-fuchsia-200">
              <div>
                2
              </div>
              <div>
                3
              </div>
            </div>
          </div>
          <div className="flex w-1/4 bg-amber-200 m-2 mr-4">
            5
          </div>
        </section>

      </main>
    </div>
  );
}
