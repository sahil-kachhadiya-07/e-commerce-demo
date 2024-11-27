'use client'
import React, { ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar'
import { sideMenuList } from '../constants/admin/sidebar'

//used for admin user
interface LayoutProps {
  children: ReactNode
}

function Layout ({ children }: LayoutProps) {
  return (
    <main className='flex'>
      <Sidebar data={sideMenuList}/>
      <section className='flex-1'>{children}</section>
    </main>
  )
}

export default Layout
