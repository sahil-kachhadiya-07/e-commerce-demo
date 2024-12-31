"use client";

import { Button } from "@/app/components/Button";
import { FieldInput } from "@/app/components/FieldInput";
import { useImageReplace, useImageUpload } from "@/app/services/cloudinary";
import { getAdmins } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, UpdateAdmin } from "@/lib/firestore/admins/write";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminSchema } from "@/app/schema/admin";
import { UploadImage } from "@/app/components/UploadImage";

const Form = () => {
  const [prevData, setPrevData] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const methods = useForm({ resolver: zodResolver(adminSchema), defaultValues: { name: "", email: "" } });

  const fetchData = async () => {
    try {
      const res = await getAdmins({ id: id });
      if (!res) {
        toast.error("Admin Not Found");
        router.push('/admin/admins')
      } else {
        setPrevData(res);
        setImage(res.imageURL);
        methods.reset({
          name: res.name || "",
          email: res.email || ""
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

  const handleCreate = async (data) => {
    setIsLoading(true);
    if (!image) {
      alert("upload image")
    }
    try {
      const response = await useImageUpload(image, "admins");
      await createNewAdmin({ data: data, imageURL: response?.fileUrl });
      toast.success("Successfully Created");
      methods.reset({
        name: "",
        email: ""
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
    if (!prevData.id) {
      router.push('/admin/brands')
      toast.error("Data Not Found")
      return
    }
    setIsLoading(true);
    try {
      const responseImage = await useImageReplace(image, prevData?.imageURL)
      const response = await UpdateAdmin({ data: prevData, updatedData: updatedData, imageURL: responseImage.fileUrl });
      toast.success("Successfully Updated");
      methods.reset({
        name: "",
        email: ""
      });
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';  // Clear the input field
      }
      router.push('/admin/admins')
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1>{id ? "Update" : "Create"} Admin</h1>
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
            placeholder="Enter Email"
            label="Email"
            required
            name="email"
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
