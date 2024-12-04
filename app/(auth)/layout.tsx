'use client'

import AuthContextProvider from '@/context/AuthContext'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children:ReactNode
}

function Layout({children}:LayoutProps) {
  return (
    <AuthContextProvider>
        {children}
    </AuthContextProvider>
  )
}

export default Layout