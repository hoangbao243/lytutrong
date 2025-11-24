"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Editor from './component/Editor';

export default function Adminpage() {
  const user = "a";
  const navigate = useRouter()
  useEffect(()=>{
    if (user == undefined) {
      navigate.push("/login")
    }
  },[])
  return (
    <div>
      <Editor></Editor>
    </div>
  )
}