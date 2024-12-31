import { UploadImage } from '@/app/components/UploadImage';
import React, { useState } from 'react'

const Images = ({setFeatureImage , featureImage , setImageList , imageList}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = (e) => {
    if (!e.target.files.length) {
      setErrorMessage("An image is required. Please upload one.");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <section className='flex flex-col bg-white border p-4 rounded-xl'>
      <h1 className='font-semibold'>Feature Image</h1>
       <UploadImage featureImage={featureImage}   onChange={(e) => {
                if (e.target.files.length > 0) {
                    setFeatureImage(e.target.files[0]);
                }
              }}/> 
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm">Images</label>
            {imageList.length>0 && (
              <div className="flex flex-wrap gap-3">
                 {/* URL.createObjectURL used to convert file into url */}
                {imageList.map((img,index)=>(<img key={index}
                  className="h-20 object-cover rounded-lg"
                  src={img instanceof File ? URL.createObjectURL(img) : img}
                  alt="image"
                />))}
              </div>
            )}
            <input
              placeholder="Enter Image"
              accept="image/*"
              className="border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none"
              type="file"
              multiple
              name="image"
            //   ref={fileInputRef}
              // required
              onChange={(e) => {
                const newFile = [];
                for(let i=0 ; i< e.target.files.length ; i++)
                {
                    newFile.push(e.target.files[i])
                }
                    setImageList(newFile);
              }}
            />
          </div>
    </section>
  )
}

export default Images
