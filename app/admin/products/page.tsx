import { Button } from '@/app/components/Button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
 <main className='p-5'>
   <div className='flex items-center justify-between'>
   <h1 className='text-xl'>Products</h1>
   <Link href={"/admin/products/form"}>
   <Button className="!bg-[#313131] !rounded-lg">Create</Button>
   </Link>
   </div>
 </main>
  )
}

export default page