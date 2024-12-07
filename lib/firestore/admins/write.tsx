import { Timestamp, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../fierbase';

export const createNewAdmin = async ({data ,imageURL}) => {
  if(!imageURL){
    throw new Error("image is Required");
  }
  if(!data?.name)
  {
    throw new Error("name is Required");
  }
  if(!data?.email)
  {
    throw new Error("email is Required");
  }

  //this logic is used to generate random id
  const newId = data?.email

  // const imageRef = ref(storage,`admins/${newId}`);
  // await uploadBytes(imageRef , image);
  // const imageUrl = await getDownloadURL(imageRef)


  try {
    await setDoc(doc(db, `admins/${newId}`), { 
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
export const deleteAdmin = async ({id}) => {
 if(!id)
 {
   throw new Error("ID is require")
 }
 await deleteDoc(doc(db,`admins/${id}`))
}

export const UpdateAdmin = async ({data,updatedData,imageURL}) => {
  if(!data?.name)
  {
    throw new Error("name is Required");
  }
  if(!data?.email)
  {
    throw new Error("email is Required");
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
    if(id===data?.email){
    await updateDoc(doc(db, `admins/${id}`), { 
      name:updatedData?.name,
      email:updatedData?.email,
      imageURL:image,
      timeStampCreate: Timestamp.now()
    });}
    else{
      const newId = data?.email

      await deleteDoc(doc(db, `admins/${id}`))
      await setDoc(doc(db, `admins/${newId}`), { 
        ...data,
        id:newId,
        imageURL:image,
        timeStampCreate: Timestamp.now()
      });
    }
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}