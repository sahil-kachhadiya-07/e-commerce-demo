import React, { useState } from 'react'

interface UploadImageProps {
  image?: File | string; // For single image input (File or URL string)
  imageList?: (File | string)[]; // For multiple image inputs (array of Files or URLs)
  label?: string; // Optional label for the input
  name: string; // Name for the input field
  [key: string]: any; // Allow additional props for flexibility
}
const UploadImage:React.FC<UploadImageProps> = ({image,imageList=[],required,label,name,...props}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const handleBlur = (e) => {
        if (!e.target.files.length) {
          setErrorMessage("An image is required. Please upload one.");
        } else {
          setErrorMessage("");
        }
      };
  return (
    <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm">{label} <span className='text-red-500'>*</span></label>
           {image && (
              <div className="flex justify-center items-center p-3">
                 {/* URL.createObjectURL used to convert file into url */}
                <img
                  className="h-20 object-cover rounded-lg"
                  src={image instanceof File ? URL.createObjectURL(image) : image}
                  alt="image"
                />
              </div>
            )}
            {imageList?.length > 0 && (<div className="flex flex-wrap gap-3">
            {/* URL.createObjectURL used to convert file into url */}
           {imageList?.map((img,index)=>(<img key={index}
             className="h-20 object-cover rounded-lg"
             src={img instanceof File ? URL.createObjectURL(img) : img}
             alt="image"
           />))}
         </div>)}
            <input
              placeholder="Enter Image"
              accept="image/*"
              className="border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none"
              type="file"
              name={name}
              onBlur={required ? handleBlur : undefined}
              {...props}
            />
              {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
          </div>
  )
}

export default UploadImage