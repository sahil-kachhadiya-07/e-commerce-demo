"use client";

import { Button } from "@/app/components/Button";
import { FieldInput } from "@/app/components/FieldInput";
import { UploadImage } from "@/app/components/UploadImage";
import { categorySchema } from "@/app/schema/admin";
import { useImageReplace, useImageUpload } from "@/app/services/cloudinary";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { UpdateCategory, createNewCategory } from "@/lib/firestore/categories/write";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Form = () => {
  const [prevData, setPrevData] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const methods = useForm({resolver: zodResolver(categorySchema), defaultValues: { name: "", slug: "" } });
  
  const handleCreate = async (data) => {
    setIsLoading(true);
    if(!image){
      alert("upload image")
    }
    try {
      const response =  await useImageUpload(image , "categories");
      await createNewCategory({ data: data, imageURL: response?.fileUrl });
      toast.success("Successfully Created");
      methods.reset({
        name:"",
        slug:"",
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
      router.push('/admin/categories')
      toast.error("Data Not Found")
      return
    }
    setIsLoading(true);
    try {
      const responseImage = await useImageReplace(image , prevData?.imageURL)
      const response = await UpdateCategory({data:prevData,updatedData:updatedData,imageURL:responseImage.fileUrl});
      toast.success("Successfully Updated");
      methods.reset({
        name:"",
        slug:"",
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Clear the input field
      }
        router.push('/admin/categories')
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    setIsLoading(false);
  }
  
  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category Not Found");
        router.push('/admin/categories')
      } else {
        setPrevData(res);
        setImage(res.imageURL); 
        methods.reset({
          name: res.name || "",
          slug: res.slug || "",
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
      <h1>{id ? "Update" : "Create"} Category</h1>
      <FormProvider {...methods}>
        <form 
          onSubmit={methods.handleSubmit(id ? handleUpdate : handleCreate)}
          className="flex flex-col gap-3"
        >
           <UploadImage image={image} label="Image" name="image"
            required={id ? false : true}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
          <FieldInput
            placeholder="Enter Name"
            label="Name"
            required
            name="name"
          />
          <FieldInput
            placeholder="Enter Slug"
            label="Slug"
            required
            name="slug"
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
