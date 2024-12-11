'use client'

import { FieldInput } from '@/app/components/FieldInput'
import { FieldSelect } from '@/app/components/FieldSelect'
import Select from '@/app/components/Select/Select'
import { useBrands } from '@/lib/firestore/brands/read'
import { useCategories } from '@/lib/firestore/categories/read'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const BasicDetails = ({handleData}) => {
    const {data:brands} = useBrands()
    const {data:categories} = useCategories()

    const Brands = brands?.map((item)=>({label:item.name , value:item.id}))
    const Categories = categories?.map((item)=>({label:item.name , value:item.id}))
    const methods = useForm()
  return (
    <section className='bg-white flex-1 flex flex-col gap-3 rounded-xl p-4 border'>
        <h1 className='font-semibold'>Basic Details</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleData)} className='flex flex-col gap-3'>
        <FieldInput name="title" label="Product Name" placeholder='Enter Title' required/>
        <FieldInput name="shortdescription" label="Short Description" placeholder='Enter Short Description' required/>
        <FieldInput name="stocks" label="Stocks" placeholder='Enter Stocks' required/>
        <FieldInput name="price" type='number' label="Price" placeholder='Enter Price' required/>
        <FieldInput name="saleprice" type='number' label="Sale Price" placeholder='Enter Sale Price' required/>
        <FieldSelect options={Brands} label="Brand" required name='brandId' firstChild='Select Brand'/>
        <FieldSelect options={Categories} label="Category" required name='categoryId' firstChild='Select Category'/>  
        </form>
      </FormProvider>
    </section>
  )
}

export default BasicDetails
