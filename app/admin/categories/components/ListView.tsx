'use client'
import { Button } from '@/app/components/Button'
import { useCategories } from '@/lib/firestore/categories/read'
import { deleteCategory } from '@/lib/firestore/categories/write'
import axios from 'axios'
import { Delete, Edit2, Loader2, Trash2 } from 'lucide-react'
// import { CircularProgress } from '@nextui-org/react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ListView = () => {
  const { data: categories, error, isLoading } = useCategories()
  console.log('data', categories)
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
    <div className='rounded-xl flex-1 flex flex-col gap-3 gap px-5'>
      <h1 className='text-xl'>Categories</h1>
      <table className='border-separate  border-spacing-y-3'>
        <thead>
          <tr>
            <th className='font-semibold border-y bg-white px-3 py-3 border-l rounded-l-lg'>
              SN
            </th>
            <th className='font-semibold border-y bg-white px-3 py-3'>Image</th>
            <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
              Name
            </th>
            <th className='font-semibold border-y bg-white px-3 py-3 border-r rounded-r-lg'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => {
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
  console.log('item.imageURL', item.imageURL)
  const handleDelete = async () => {
    if (!confirm('Are you sure')) return
    setIsDeleting(true)
    try {
      //this api is for delete image from cloud
      const response = await axios.delete('/api/delete-image', {
        params: {
          imageUrl: item.imageURL // Pass the image URL as a query parameter
        }
      })
      console.log('Image deletion successful:', response.data)

      // this api is used to delete data from databse
      await deleteCategory({ id: item?.id })
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
        <div className='flex items-center flex-row gap-2'>
          <Button className='!bg-gray-400 !px-2'>
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
