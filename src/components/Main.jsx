"use client"
import React, { useEffect, useState } from "react";
import Slideshow from "@/components/slideshow/Slideshow";
import axios from "axios";
import toast from "react-hot-toast";

export default function Main() {
  const [data,setData] = useState([])

  useEffect(()=>{
    const getData = async () =>{
      try {
        const res = await axios.get(`/api/post/topnew`)
        if (res.status == 200) {
          setData(res.data)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    
    getData()
  },[])
  return (
    <div className="w-full">
      <Slideshow data={data}></Slideshow>
    </div>
  );
}
