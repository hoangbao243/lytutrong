import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='flex flex-col justify-start items-start m-4 bg-white w-1/2'>
      <span>Trưởng ban biên tập: <span>Cô Trần Thị Lệ - Hiệu Trưởng</span></span>
      <span></span>
      <span>Bản quyền © 2025 Trường Tiểu Học Lý Tự Trọng - Đà Nẵng</span>
      <span>Thiết kế bởi <Link href={`#`}>IT Trí Việt</Link></span>
    </footer>
  )
}
