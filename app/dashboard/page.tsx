import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <main>
        <h1>page</h1>
        <Link href={"/admin"}>
        Admin Panel
        </Link>
    </main>
  )
}

export default page