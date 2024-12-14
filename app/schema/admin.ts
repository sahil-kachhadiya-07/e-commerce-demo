import { z } from "zod";

  export const categorySchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    slug: z.string().min(1, "Name is required").max(100, "Name is too long")
  });

  export const  brandSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  });

  export const adminSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
  });

 export const ProductsSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
 })