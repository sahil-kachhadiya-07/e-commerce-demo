import React, { useState } from 'react'

const UploadImage = ({featureImage,...props}) => {
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
            <label className="text-gray-500 text-sm">Image <span className='text-red-500'>*</span></label>
            {featureImage && (
              <div className="flex justify-center items-center p-3">
                 {/* URL.createObjectURL used to convert file into url */}
                <img
                  className="h-20 object-cover rounded-lg"
                  src={featureImage instanceof File ? URL.createObjectURL(featureImage) : featureImage}
                  alt="image"
                />
              </div>
            )}
            <input
              placeholder="Enter Image"
              accept="image/*"
              className="border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none"
              type="file"
              name="image"
              onBlur={handleBlur}
              {...props}
            />
              {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
          </div>
  )
}

export default UploadImage