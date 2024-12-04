'use client'
import { MainLogoIcon } from '@/app/assets'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/app/components/Button'
import { toast } from 'react-hot-toast'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firestore/fierbase'

interface data {
  name: string
  link: string
  icon: ReactNode
}
interface SideBarProps {
  data: data[]
}

const Sidebar: React.FC<SideBarProps> = ({ data }) => {
  
  const handleLogOut = async () => {
    try {
      await toast.promise(signOut(auth),{
        error:(e)=>e?.message,
        loading:"Loading...",
        success:"Successfully Logged out"
      })
    } catch (error:any) {
      toast.error(error?.message)
    }
  }

  return (
    <section className='bg-white gap-10 flex flex-col  px-5 py-3 border-r h-screen overflow-hidden !w-[260px]'>
      <div className='flex justify-center'>
        <MainLogoIcon className='!w-[200px]' />
      </div>
      {/* h-full overflow-y-auto used for scroll only menu */}
      <div className='flex-1 flex h-full overflow-y-auto flex-col gap-4'>
        {(data || []).map((item, index) => {
          return <Tab item={item} key={index} />
        })}
      </div>
      <Button onClick={handleLogOut} className='flex gap-2 !text-[20px] items-center !bg-white hover:!bg-indigo-100 !text-black font-semibold ease-in-out transition-all duration-400 !rounded-xl'><LogOut className='h-5 w-5'/> Log Out </Button>
    </section>
  )
}

const Tab = ({ item }: { item: data }) => {
  const pathname = usePathname()
  const isSelected =  pathname === item?.link
  return (
    <Link href={item.link}>
      <div className={`flex flex-row gap-2 px-4 py-2 rounded-xl font-semibold items-center ease-in-out transition-all duration-300 hover:bg-indigo-100  ${isSelected ? "bg-[#879fff] hover:!bg-[#879fff] text-white": " bg-white text-black"}`}>
        {item.icon} {item.name}
      </div>
    </Link>
  )
}

export default Sidebar
