'use client'

import React, { ReactNode, useEffect } from 'react'
import AdminLayout from './components/AdminLaoyut/AdminLaoyut'
import AuthContextProvider, { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  )
}

const AdminChecking = ({ children }: LayoutProps) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading])
  if (isLoading) {
    <div className='h-screen w-screen flex justify-center items-center'>
      <Loader2 className='animate-spin' />
    </div>
  }
  if (!user) {
    ;<div className='h-screen w-screen flex justify-center items-center'>
      <h1>Please Login First...</h1>
    </div>
  }
  return <AdminLayout>{children}</AdminLayout>
}
export default Layout
