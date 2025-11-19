import React from 'react'

export default function Header() {
  return (
    <header className="relative flex h-10 md:h-fit bg-[#7cbf96] md:bg-white w-full items-center justify-center z-60">
      <img src="/images/banner.png" className='hidden md:flex w-full md:h-100 h-75 md:px-2' alt="lytutrong" />
      <img src="/images/logo2.png" alt="logo" className='absolute top-0 left-[40%] md:left-2 md:w-40 md:h-40 w-23 h-23 z-60'/>
    </header>
  )
}
