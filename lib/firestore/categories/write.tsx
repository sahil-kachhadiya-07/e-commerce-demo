import { collection, doc } from 'firebase/firestore';
import React from 'react'
import { db } from '../fierbase';

export const createNewCategory = async ({data,image}) => {
  if(!image){
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
  
}

