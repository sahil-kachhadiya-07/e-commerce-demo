import { MainLogoIcon } from '@/app/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../Button'


const Header = () => {
    const menuList = [
        {
            label:"Home",
            link:"/"
        },{
            label:"About Us",
            link:"/about-us"
        },{
            label:"Contact Us",
            link:"/contact-us"
        }
    ]
  return (
   <nav className='w-full py-4 px-8 border-solid border-b-[1px] flex justify-between'>
        {/* <MainLogoIcon className="p-3"/> */}
      <div className='flex flex-row gap-4 items-center font-semibold'>
      {
        menuList.map((item,index)=>(
            <Link key={index} href={item?.link}>
             <button>{item?.label}</button> 
            </Link>
        ))
      }
      </div>
      <Link href={'/login'} className='flex items-center justify-center'>
      <Button className='h-fit rounded-full !py-1'>Login</Button>
      </Link>
   </nav>
  )
}

export default Header