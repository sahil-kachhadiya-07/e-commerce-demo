'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'
import { Sidebar } from '../Sidebar'
import { Header } from '../Header'
import { sideMenuList } from '@/app/constants/admin/sidebar'

//used for admin user
interface LayoutProps {
  children: ReactNode
}

function AdminLayout ({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      sidebarRef?.current &&
      !sidebarRef?.current?.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }
  
  const toggleSideBar = () => {
    setIsOpen(prev => !prev)
  }
  useEffect(() => {
    toggleSideBar()
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])
  return (
    <main className='flex relative'>
      {/* after 768 sidebar is visible */}
      <div className='hidden md:block'>
        <Sidebar data={sideMenuList} />
      </div>
      <div
        ref={sidebarRef}
        className={`fixed md:hidden transition-all ease-in-out duration-400 ${
          isOpen ? 'translate-x-0' : 'translate-x-[-260px]'
        }`}
      >
        <Sidebar data={sideMenuList} />
      </div>
      {/* min-h-screen is used to full screen mode */}
      <section className='flex-1 flex flex-col min-h-screen overflow-hidden'>
        <Header toggleSideBar={toggleSideBar} />
        <section className='flex-1 bg-[#eff3f4]'>{children}</section>
      </section>
    </main>
  )
}

export default AdminLayout