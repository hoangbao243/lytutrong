"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigate = useRouter()
  useEffect(()=>{
    navigate.push(`/`)
  },[])
  return (
    <div className="flex flex-col min-h-screen items-center md:mt-2 justify-center bg-zinc-50 font-sans dark:bg-black">
      loading...
    </div>
  );
}
