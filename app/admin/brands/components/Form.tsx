"use client";

import { Button } from "@/app/components/Button";
import { FieldInput } from "@/app/components/FieldInput";
import { useImageReplace, useImageUpload } from "@/app/services/cloudinary";
import { getBrands } from "@/lib/firestore/brands/read_server";
import { UpdateBrand, createNewBrand } from "@/lib/firestore/brands/write";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema } from "@/app/schema/admin";

const Form = () => {
  const [prevData, setPrevData] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const methods = useForm({resolver: zodResolver(brandSchema) , defaultValues: { name: ""} });
  
  const handleCreate = async (data) => {
    setIsLoading(true);
    if(!image){
      alert("upload image")
    }
    try {
      const response =  await useImageUpload(image , "brands");
      await createNewBrand({ data: data, imageURL: response?.fileUrl });
      toast.success("Successfully Created");
      methods.reset({
        name:"",
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Clear the input field
      }
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } 
    setIsLoading(false);  
  };

  const handleUpdate = async (updatedData) => {
    if(!prevData.id)
    {
      router.push('/admin/brands')
      toast.error("Data Not Found")
      return
    }
    setIsLoading(true);
    try {
      const responseImage = await useImageReplace(image , prevData?.imageURL)
      const response = await UpdateBrand({data:prevData,updatedData:updatedData,imageURL:responseImage.fileUrl});
      toast.success("Successfully Updated");
      methods.reset({
        name:"",
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Clear the input field
      }
        router.push('/admin/brands')
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    setIsLoading(false);
  }
  
  const fetchData = async () => {
    try {
      const res = await getBrands({ id: id });
      if (!res) {
        toast.error("Category Not Found");
        router.push('/admin/brands')
      } else {
        setPrevData(res);
        setImage(res.imageURL); 
        methods.reset({
          name: res.name || "",
        });
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1>{id ? "Update" : "Create"} Brand</h1>
      <FormProvider {...methods}>
        <form 
          onSubmit={methods.handleSubmit(id ? handleUpdate : handleCreate)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm">Image <span className='text-red-500'>*</span></label>
             {image && (
              <div className="flex justify-center items-center p-3">
                 {/* URL.createObjectURL used to convert file into url */}
                <img
                  className="h-20"
                  src={image instanceof File ? URL.createObjectURL(image) : image}
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
              ref={fileInputRef}
              required={id?false:true}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
          <FieldInput
            placeholder="Enter Name"
            label="Name"
            required
            name="name"
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            className="!bg-gray-300 !py-1 rounded-lg !text-black"
          >
            {id ? "Update" : "Create"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
