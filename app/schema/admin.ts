import { z } from "zod";

  export const categorySchema = z.object({
    name: z.string().min(1, "This field is required").max(100, "Name is too long"),
    slug: z.string().min(1, "This field is required").max(100, "Name is too long")
  });

  export const  brandSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  });

  export const adminSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().min(1, "This field is required").email("Invalid email address"),
  });

 export const ProductsSchema = z.object({
  title: z.string().min(1, "This field is required").max(100, "Name is too long"),
  shortdescription: z.string().min(1, "This field is required"),
  brandId: z.string().min(1, "This field is required"),
  categoryId: z.string().min(1, "This field is required"),
  stocks: z.string().min(1, "This field is required"),
  price: z.string().min(1, "This field is required"),
  saleprice: z.string().min(1, "This field is required"),
 })