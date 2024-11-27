import { MainLogoIcon } from '@/app/assets'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'

interface data {
  name: string
  link: string
  icon:ReactNode
}
interface SideBarProps {
  data: data[]
}

const Sidebar: React.FC<SideBarProps> = ({ data }) => {
  return (
    <section className='bg-white gap-10 flex flex-col  px-5 py-3 border-r h-screen overflow-hidden md:!w-[260px]'>
     <div className='flex justify-center'>
     <MainLogoIcon className='!w-[200px]' />
     </div>
      <div className='flex-1 flex flex-col gap-4'>
        {(data || []).map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div className='flex flex-row gap-2 px-4 py-2 rounded-xl font-semibold items-center'> {item.icon} {item.name}</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar
