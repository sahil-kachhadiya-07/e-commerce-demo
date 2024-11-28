'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Form = () => {
    const [data , setData] = useState()
    const [image , setImage] = useState()
    const methods = useForm()
    const handleForm = (data) => {
        setData(data)
        handleCreate()
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
            <FieldInput placeholder='Enter Image' label='Image' type='file' required name="category-image" onChange={(e)=>{
                if(e.target.files.length>0)
                {
                    setImage(e.target.files[0])
                }
            }}/>
            {/* URL.createObjectURL used to convert file into url */}
            {image && <div className='flex justify-center items-center p-3'>
                <img className='h-20' src={URL.createObjectURL(image)} alt="image"/></div>}
            <FieldInput placeholder='Enter Name' label='Name' required name="category-name"/>
              <FieldInput placeholder='Enter Slug' label='Slug' required name="category-slug"/>
            <Button className='!bg-gray-300 !py-1 rounded-lg !text-black'>Create</Button>
            </form>
        </FormProvider>
    </div>
  )
}

export default Form