"use client";

import { Button } from "@/app/components/Button";
import { FieldInput } from "@/app/components/FieldInput";
import { UseImageDelete, useImageUpload } from "@/app/utils/cloudinaryCrud";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { UpdateCategory, createNewCategory } from "@/lib/firestore/categories/write";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Form = () => {
  const [prevData, setPrevData] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const methods = useForm();


   
  const handleCreate = async (data) => {
    setIsLoading(true);
    if(!image){
      alert("upload image")
    }
    try {
      const response =  await useImageUpload({image});
      await createNewCategory({ data: data, imageURL: response?.fileUrl });
      toast.success("Successfully Created");
      methods.reset();
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async (data) => {
    let response
    setIsLoading(true);
    try {
      if (image && prevData.imageURL) {
        await UseImageDelete(prevData?.imageURL);
      }
      if(!prevData.imageURL)
      {
         response =  await useImageUpload({image}); // Delete the existing image
      }
      await UpdateCategory({data:prevData,updatedData:data,image:response?.fileUrl });
      toast.success("Successfully Created");
      methods.reset();
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    setIsLoading(false);
  }
  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id });
      if (!res) {
        toast.error("Category Not Foud");
      } else {
        setPrevData(res);
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
          onSubmit={methods.handleSubmit(handleUpdate)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-sm">Image*</label>
            {image && (
              <div className="flex justify-center items-center p-3">
                {/* URL.createObjectURL used to convert file into url */}
                <img
                  className="h-20"
                  src={URL.createObjectURL(image)}
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
              required
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
              // value={data.imageURL}
            />
          </div>
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
