'use client'
import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description'

const page = () => {
    
    const [featureImage , setFeatureImage] = useState(null)
    const [imageList , setImageList] = useState([])
    const [data ,setData] = useState(null)

    const handleData = (data) => {

    }
  return (
    <main className='p-5 flex flex-col gap-5'>
      <h1 className='font-semibold'>Create New Product</h1>
      <div className='flex flex-col md:flex-row gap-5'>
        <BasicDetails handleData={handleData}/>
       <div className='flex flex-1 flex-col gap-5'>
       <Images featureImage={featureImage} setFeatureImage={setFeatureImage} setImageList={setImageList} imageList={imageList}/>
       <Description data={data} handleData={handleData}/>
       </div>
      </div>
    </main>
  )
}

export default page
