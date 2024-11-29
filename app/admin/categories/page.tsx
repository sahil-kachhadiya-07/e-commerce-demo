'use Client'
import React from 'react'
import Form from './components/Form'
import ListView from './components/ListView'

const page = () => {
  return (
    <main className='p-5 flex gap-5'>
          <Form/>
          <ListView/>
    </main>
  )
}

export default page