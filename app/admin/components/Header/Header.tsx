'use client'
import { Menu } from 'lucide-react'
import React from 'react'

interface HeaderProps {
    toggleSideBar:()=>void
}

const Header:React.FC<HeaderProps> = ({toggleSideBar}) => {
  return (
    <section className='bg-white border-b px-4 py-4 flex flex-row gap-3 items-center'>
        <div className='flex items-center justify-center md:hidden'><button onClick={toggleSideBar}><Menu/></button></div>
        <h1 className='text-xl font-semibold'>
            Dashboard
        </h1>
    </section>
  )
}

export default Header