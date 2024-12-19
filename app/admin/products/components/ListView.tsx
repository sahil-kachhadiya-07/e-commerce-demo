'use client'
import { Button } from '@/app/components/Button'
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

const ListView = () => {
    const { data: products, error, isLoading } = useProducts()
    console.log('products%%', products)
    //   console.log('data', categories)
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
            {/* <h1 className='text-xl'>Products</h1> */}
            <table className='border-separate  border-spacing-y-3'>
                <thead>
                    <tr>
                        <th className='font-semibold border-y bg-white px-3 py-3 border-l rounded-l-lg'>
                            SN
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3'>Image</th>
                        <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
                            Title
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
                            Price
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
                            Stock
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
                            Orders
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3 text-left'>
                            Status
                        </th>
                        <th className='font-semibold border-y bg-white px-3 py-3 border-r rounded-r-lg'>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => {
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
            <td className='border-y bg-white px-3 py-3'>{item?.title}</td>
            <td className='border-y bg-white px-3 py-3'>{item?.price}</td>
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
