'use client'
import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description'
import { Button } from '@/app/components/Button'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'

const page = () => {
    
    const [featureImage , setFeatureImage] = useState(null)
    const [imageList , setImageList] = useState([])
    const [description , setDescription] = useState()
    const [uploadUrl , setUploadedUrls] = useState()
    const [data ,setData] = useState(null)

    const methods = useForm()
    const handleData = (data) => {
     console.log("$$$$$",data,description,imageList,featureImage)
 
    }
  return (
    <main className='p-5 flex flex-col gap-5'>
         <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(handleData)} className='flex flex-col gap-3'>
      <div className='flex justify-between `items-center'>
      <h1 className='font-semibold'>Create New Product</h1>
      <Button type='submit' variant='form'>Create</Button>
      </div>
      <div className='flex flex-col md:flex-row gap-5'>
        <BasicDetails/>
       <div className='flex flex-1 flex-col gap-5'>
       <Images featureImage={featureImage} setFeatureImage={setFeatureImage} setImageList={setImageList} imageList={imageList}/>
       <Description data={data} setDescription={setDescription}/>
       </div>
      </div>
      </form>
      </FormProvider>
    </main>
  )
}

export default page
