import React from 'react'

export default function Header() {
  return (
    <header className="relative flex w-full items-center justify-center">
      <img src="/images/banner.png" className='w-full md:h-100 h-75 md:px-2' alt="lytutrong" />
      <img src="/images/logo2.png" alt="logo" className='absolute top-0 left-2 w-40 h-40'/>
    </header>
  )
}
