import { Timestamp, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../fierbase";
import { type } from "os";
import React from "react";

interface Product {
    data:{
        brandId:string
        categoryId:string
        description:string
        featureImage:string
        price:string
        saleprice:string
        stocks:string
        title:string
    }
    imageList?: string[]
    description?:string
}

export const createNewProduct  = async ({data,imageList,description}) => {
    if(!data)
    {
        throw new Error("data is Required");
    }

   const newId = doc(collection(db,'ids')).id
   try {
    const productData = {
      ...data,
      id: newId,
      timeStampCreate: Timestamp.now(),
    };
    
    if(description)
    {
      productData.description = description;
    }
    // Add `imageList` only if it exists and is not empty
    if (imageList && imageList.length > 0) {
      productData.imageList = [...imageList];
    }

    await setDoc(doc(db, `products/${newId}`), productData);
  } catch (error) {
    console.error("Error writing document: ", error);
  }

}

export const deleteProduct = async ({id}) => {
    if(!id)
    {
      throw new Error("ID is require")
    }
    await deleteDoc(doc(db,`products/${id}`))
   }
   