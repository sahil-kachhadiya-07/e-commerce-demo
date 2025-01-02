'use client'
import { Button } from '@/app/components/Button'
import { Select } from '@/app/components/Select'
import { ProductTableHeaders } from '@/app/constants/common'
import { UseImageDelete } from '@/app/services/cloudinary'
import { useCategories } from '@/lib/firestore/categories/read'
import { deleteCategory } from '@/lib/firestore/categories/write'
import { useProducts } from '@/lib/firestore/products/read'
import { deleteProduct } from '@/lib/firestore/products/write'
import axios from 'axios'
import { Delete, Edit2, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import { CircularProgress } from '@nextui-org/react';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

 const data = [
    {
     label:"3 Items" , value:3
 },   {
    label:"5 Items" , value:5
},   {
    label:"7 Items" , value:7
},   {
    label:"10 Items" , value:10
},   {
    label:"50 Items" , value:50
}, {
    label:"100 Items" , value:100
},]
const ListView = () => {
    const [pageLimit , setPageLimit] = useState(10)
    const { data: products, error, isLoading } = useProducts()
      const [currentPage, setCurrentPage] = useState(1)
    console.log('products%%', products)
     const totalPages = Math.ceil(products?.length / pageLimit)
  const currentData = products?.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit
  )

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
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
        <div className='rounded-xl flex-1 flex flex-col gap-3 gap md:pr-5 md:px-0 px-0 w-full overflow-x-auto'>
            {/* <h1 className='text-xl'>Products</h1> */}
            <table className='border-separate  border-spacing-y-3'>
                <thead>
                    <tr>
                        {ProductTableHeaders.map((header, index) => (
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
                    {currentData?.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Row index={index}  item={item} />
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
              <div className='flex justify-between items-center mt-4 w-full'>
            <Button variant='form'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
     <Button
          variant='form'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
        </div>
    )
}


const Row = ({ index, item }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleUpdate = async () => {
        router.push(`/admin/products/form?id=${item?.id}`)
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure')) return
        setIsDeleting(true)
        try {
            const response = await UseImageDelete(item.imageURL)
            console.log('Image deletion successfully:', response)

            await deleteProduct({ id: item?.id })
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
                    <img className='h-10 w-10' src={item?.featureImage} />
                </div>
            </td>
            <td className='border-y bg-white px-3 py-3 whitespace-nowrap'>{item?.title}</td>
            <td className='border-y bg-white px-3 py-3 whitespace-nowrap'>{(item?.saleprice < item?.price) && <span className='text-gray-400 text-xs line-through'>₹{item?.price}</span>}{" "}₹{item?.saleprice}</td>
            <td className='border-y bg-white px-3 py-3'>{item?.stocks}</td>
            <td className='border-y bg-white px-3 py-3'>{item?.orders ?? 0}</td>
            <td className='border-y bg-white px-3 py-3'>
                <div className='flex '>
                    {(item?.stocks - (item?.orders ?? 0)) > 0 ?
                        <div className='px-2 py-1 text-green bg-[#D1E7DD] rounded-md flex items-center justify-center'>Available</div> :
                        <div className='px-2 py-1 text-red-700 bg-[#F8D7DA] rounded-md flex items-center justify-center'>Out of Stock</div>}
                </div>
            </td>
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
