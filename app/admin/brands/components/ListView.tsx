'use client'
import { Button } from '@/app/components/Button'
import {  TableHeaders } from '@/app/constants/common'
import { UseImageDelete } from '@/app/services/cloudinary'
import { useBrands } from '@/lib/firestore/brands/read'
import { deleteBrand } from '@/lib/firestore/brands/write'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ListView = () => {
  const { data: brands, error, isLoading } = useBrands()
  console.log('data', brands)
  if (isLoading) {
    return (
      <div>
        <Loader2 className='animate-spin' />
      </div>
    )
  }
  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className='rounded-xl flex-1 flex flex-col gap-3 gap md:pr-5 md:px-0 px-0'>
      <h1 className='text-xl'>Brands</h1>
      <table className='border-separate  border-spacing-y-3'>
        <thead>
        <tr>
    {TableHeaders.map((header, index) => (
      <th
        key={index}
        className={`font-semibold border-y bg-white px-3 py-3 ${header.className}`}
      >
        {header.name}
      </th>
    ))}
  </tr>
        </thead>
        <tbody>
          {brands?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Row index={index} item={item} />
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const Row = ({ index, item }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  console.log('item.imageURL', item.imageURL)

  const handleUpdate = async () => {
    router.push(`/admin/brands?id=${item?.id}`)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure')) return
    setIsDeleting(true)
    try {
      //this api is for delete image from cloud
      // const response = await axios.delete('/api/delete-image', {
      //   params: {
      //     imageUrl: item.imageURL // Pass the image URL as a query parameter
      //   }
      // })
      const response = await UseImageDelete(item.imageURL)
      console.log('Image deletion successfull:', response)

      // this api is used to delete data from databse
      await deleteBrand({ id: item?.id })
      toast.success('Successfully Deleted')
    } catch (error) {
      console.log(
        'Error deleting image:',
        error.response?.data || error.message
      )
      toast.error(error?.message)
    }
    setIsDeleting(false)
  }
  return (
    <tr>
      <td className='border-y bg-white px-3 py-3 border-l rounded-l-lg text-center'>
        {index + 1}
      </td>
      <td className='border-y bg-white px-3 py-3'>
        <div className='flex justify-center'>
          <img className='h-10 w-10' src={item?.imageURL} />
        </div>
      </td>
      <td className='border-y bg-white px-3 py-3'>{item?.name}</td>
      <td className='border-y bg-white px-3 py-3 border-r rounded-r-lg'>
        <div className='flex items-center justify-center flex-row gap-2'>
          <Button className='!bg-gray-400 !px-2' onClick={handleUpdate}>
            <Edit2 size={13} />
          </Button>
          <Button
            className='!bg-red-100 !px-2'
            onClick={handleDelete}
            loading={isDeleting}
            disabled={isDeleting}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  )
}

export default ListView
