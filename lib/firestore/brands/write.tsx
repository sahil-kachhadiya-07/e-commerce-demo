import { Timestamp, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../fierbase';

export const createNewBrand = async ({data ,imageURL}) => {
  if(!imageURL){
    throw new Error("image is Required");
  }
  if(!data?.name)
  {
    throw new Error("name is Required");
  }

  //this logic is used to generate random id
  const newId = doc(collection(db,'ids')).id

  // const imageRef = ref(storage,`categories/${newId}`);
  // await uploadBytes(imageRef , image);
  // const imageUrl = await getDownloadURL(imageRef)


  try {
    await setDoc(doc(db, `brands/${newId}`), { 
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
export const deleteBrand = async ({id}) => {
 if(!id)
 {
   throw new Error("ID is require")
 }
 await deleteDoc(doc(db,`brands/${id}`))
}

export const UpdateBrand = async ({data,updatedData,imageURL}) => {
  if(!data?.name)
  {
    throw new Error("name is Required");
  }
  if(!data?.id)
    {
      throw new Error("id is Required");
    }
  
    const id = data?.id
    let image = data?.imageURL
  if(imageURL)
  {
    image = imageURL
  }

  try {
    await updateDoc(doc(db, `brands/${id}`), { 
      name:updatedData?.name,
      imageURL:image,
      timeStampCreate: Timestamp.now()
    });
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}