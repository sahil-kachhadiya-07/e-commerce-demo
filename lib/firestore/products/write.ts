import { Timestamp, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../fierbase";
import { type } from "os";

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
}

export const createNewProduct = async ({data,imageList}) => {
    if(!data)
    {
        throw new Error("data is Required");
    }

   const newId = doc(collection(db,'ids')).id
   try {
    await setDoc(doc(db, `products/${newId}`), { 
      ...data,
      id: newId,
      imageList:[...imageList],
      timeStampCreate: Timestamp.now()
    });
  } catch (error) {
    console.error("Error writing document: ", error);
  }

}

export const deleteCategory = async ({id}) => {
    if(!id)
    {
      throw new Error("ID is require")
    }
    await deleteDoc(doc(db,`categories/${id}`))
   }
   