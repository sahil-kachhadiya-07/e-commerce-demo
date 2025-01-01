'use client'
import React, { useState } from 'react'
import BasicDetails from './components/BasicDetails'
import Images from './components/Images'
import Description from './components/Description'
import { Button } from '@/app/components/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { createNewProduct } from '@/lib/firestore/products/write'
import { useImageUpload, useMultipleImageUpload } from '@/app/services/cloudinary'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductsSchema } from '@/app/schema/admin'

const page = () => {
    const [featureImage , setFeatureImage] = useState(null)
    const [imageList , setImageList] = useState([])
    const [description , setDescription] = useState()
    const [uploadUrl , setUploadedUrls] = useState()
    const [isLoading , setIsLoading] = useState(false)
    const [data ,setData] = useState(null)

    const methods = useForm(
     { resolver: zodResolver(ProductsSchema), defaultValues: {title: "",
     shortdescription: "",
     brandId: "",
     categoryId: "",
     stocks: "",
     price: "",
     saleprice:"" } }
    )
    const handleData = async (data) => {
      setIsLoading(true)
     try {
     const featureImageURL = await useImageUpload(featureImage , "products")
     let imageListURL = null;
     if (imageList && imageList.length > 0) {
      imageListURL = await useMultipleImageUpload(imageList, "products");
    }
     const response = await createNewProduct({data:{...data,featureImage:featureImageURL?.fileUrl},imageList:imageListURL?.fileUrls,description:description})
      methods.reset()
      setFeatureImage(null)
      setImageList([])
      toast.success("Product Successfully Created")
     } catch (error) {
      toast.error(error.response?.data || error.message)
     }
     setIsLoading(false)
    }
  return (
    <main className='p-5 flex flex-col gap-5'>
         <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(handleData)} className='flex flex-col gap-3'>
      <div className='flex justify-between `items-center'>
      <h1 className='font-semibold'>Create New Product</h1>
      <Button loading={isLoading} disabled={isLoading} type='submit' variant='form'>Create</Button>
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
