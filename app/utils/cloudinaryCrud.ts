import axios from 'axios'

export const useImageUpload = async ({ image }) => {
    console.log('image%%%%', image)
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully");
      return response.data;
    } catch (error) {
      console.log("Error in image upload:", error.message);
      return { error: true, message: error.message }; 
    }
  };
  
export const UseImageDelete = async ({imageURL}) => {
    console.log('imageURL(((', imageURL)
    try {
      //this api is for delete image from cloud
      const response = await axios.delete('/api/delete-image', {
        params: {
          imageUrl: imageURL // Pass the image URL as a query parameter
        }
      })
      console.log('Image deletion successfull:', response.data)
    } catch (error) {
      console.log(
        'Error deleting image:',
        error.response?.data || error.message
      )
    }
  }