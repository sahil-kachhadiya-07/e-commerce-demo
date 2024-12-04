'use client'

import { Button } from '@/app/components/Button'
import { FieldInput } from '@/app/components/FieldInput'
import { createNewCategory } from '@/lib/firestore/categories/write'
import axios from 'axios'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

const Form = () => {
  const [data, setData] = useState<any>(null)
  const [image, setImage] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm()
  const handleForm = async (data) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('image', image) // 'image' must match the field name in the backend
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      await createNewCategory({ data: data, imageURL: response.data.fileUrl })
      toast.success('Successfully Created')
      methods.reset(); 
      setImage(null)
    } catch (error) {
      toast.error(error.response?.data || error.message)
    }
    setIsLoading(false)
  }

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1>Create Category</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleForm)}
          className='flex flex-col gap-3'
        >
          <div className='flex flex-col gap-1'>
            <label className='text-gray-500 text-sm'>Image*</label>
            {image && (
              <div className='flex justify-center items-center p-3'>
                {/* URL.createObjectURL used to convert file into url */}
                <img
                  className='h-20'
                  src={URL.createObjectURL(image)}
                  alt='image'
                />
              </div>
            )}
            <input
              placeholder='Enter Image'
              accept='image/*'
              className='border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none'
              type='file'
              name='image'
              required
              onChange={e => {
                if (e.target.files.length > 0) {
                  setImage(e.target.files[0])
                }
              }}
            />
          </div>
          <FieldInput
            placeholder='Enter Name'
            label='Name'
            required
            name='name'
          />
          <FieldInput
            placeholder='Enter Slug'
            label='Slug'
            required
            name='slug'
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            className='!bg-gray-300 !py-1 rounded-lg !text-black'
          >
            Create
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Form
