import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='flex flex-col justify-start items-start p-4 pl-4 mt-4 bg-white w-6xl'>
      <span>Trưởng ban biên tập: <span className='text-emerald-600'>Cô Trần Thị Lệ - Hiệu Trưởng</span></span>
      <span></span>
      <span>Bản quyền © 2025 Trường Tiểu Học Lý Tự Trọng - Đà Nẵng</span>
      <span>Thiết kế bởi <Link href={`https://thietkewebtv.com/`} target='_blank' className='text-emerald-600 font-bold'>IT Trí Việt</Link></span>
    </footer>
  )
}
