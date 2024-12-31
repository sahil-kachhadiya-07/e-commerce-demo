import { UploadImage } from '@/app/components/UploadImage';
import React, { useState } from 'react'

const Images = ({ setFeatureImage, featureImage, setImageList, imageList }) => {
  return (
    <section className='flex flex-col bg-white border p-4 rounded-xl'>

      <h1 className='font-semibold'>Feature Image</h1>

      <UploadImage image={featureImage} label="Image" name="image" onChange={(e) => {
        if (e.target.files.length > 0) {
          setFeatureImage(e.target.files[0]);
        }
      }} />

      <UploadImage imageList={imageList} label="Images" name="image" multiple onChange={(e) => {
        const newFile = [];
        for (let i = 0; i < e.target.files.length; i++) {
          newFile.push(e.target.files[i])
        }
        setImageList(newFile);
      }} />
    </section>
  )
}

export default Images
