'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import  axios  from 'axios'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'



const Form = () => {
    const [data , setData] = useState<any>()
    const [uploadId, setUploadId] = useState<string | null>(null);
    const [image , setImage] = useState<any>()
    const methods = useForm()
    const handleForm = async (data) => {
        setData(data)
        const formData = new FormData();
    formData.append('image', image); // 'image' must match the field name in the backend
   console.log('formData', image)
    try {
        const {data} = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('data.uploadId', data.uploadId)
        toast.success("file upload successfully")
    } catch (error) {
        toast.error('Upload failed:', error.response?.data || error.message);
    }
        // handleCreate()
    }
    const handleCreate = async () => {
       
    }
  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
        <h1>
            Create Category
        </h1>
        <FormProvider {...methods}>
            <form onSubmit ={methods.handleSubmit(handleForm)} className='flex flex-col gap-3'>
            <FieldInput placeholder='Enter Image' accept="image/*"  label='Image' type='file' required name="image" onChange={(e)=>{
                if(e.target.files.length>0)
                {
                    setImage(e.target.files[0])
                }
            }}/>
            {/* URL.createObjectURL used to convert file into url */}
            {image && <div className='flex justify-center items-center p-3'>
                <img className='h-20' src={URL.createObjectURL(image)} alt="image"/></div>}
            <FieldInput placeholder='Enter Name' label='Name' required name="name"/>
              <FieldInput placeholder='Enter Slug' label='Slug' required name="slug"/>
            <Button className='!bg-gray-300 !py-1 rounded-lg !text-black'>Create</Button>
            </form>
        </FormProvider>
    </div>
  )
}

export default Form