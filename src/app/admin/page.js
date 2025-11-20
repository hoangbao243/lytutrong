"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

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
      <iframe
      src={`https://drive.google.com/file/d/1Ssc5SrA7eXwgeJQhbQiZ1fbAxDM4-vjb/preview`}
      width="100%"
      className='h-180'
    />
    </div>
  )
}