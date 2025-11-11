import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Menu from "@/components/Menu";
import News from "@/components/news/News";
import Rightmenu from "@/components/Rightmenu";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header></Header>
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-start bg-white dark:bg-black">
        <Menu></Menu>
        <section className="flex w-full p-2 h-1/3">
          <div className="flex flex-col w-3/4">
            <Main></Main>
            <News></News>
          </div>
          <div className="w-1/4 p-2">
            <Rightmenu></Rightmenu>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
