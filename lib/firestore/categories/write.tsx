import { Timestamp, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { db } from '../fierbase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const createNewCategory = async ({data ,imageURL}) => {
  if(!imageURL){
    throw new Error("image is Required");
  }
  if(!data?.name)
  {
    throw new Error("name is Required");
  }
  if(!data?.slug)
  {
    throw new Error("slug is Required");
  }

  //this logic is used to generate random id
  const newId = doc(collection(db,'ids')).id

  // const imageRef = ref(storage,`categories/${newId}`);
  // await uploadBytes(imageRef , image);
  // const imageUrl = await getDownloadURL(imageRef)


  try {
    await setDoc(doc(db, `categories/${newId}`), { 
      ...data,
      id: newId,
      imageURL:imageURL,
      timeStampCreate: Timestamp.now()
    });
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}


//for delete operation
export const deleteCategory = async ({id}) => {
 if(!id)
 {
   throw new Error("ID is require")
 }
 await deleteDoc(doc(db,`categories/${id}`))
}

export const UpdateCategory = async ({data,updatedData,image}) => {
  if(!data?.name)
  {
    throw new Error("name is Required");
  }
  if(!data?.slug)
  {
    throw new Error("slug is Required");
  }
  if(!data?.id)
    {
      throw new Error("id is Required");
    }
  
    const id = data?.id
    let imageURL = data?.imageURL
    if(image)
    {
      imageURL=image
    }
  try {
    await updateDoc(doc(db, `categories/${id}`), { 
      ...updatedData,
      imageURL:imageURL,
      timeStampCreate: Timestamp.now()
    });
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}