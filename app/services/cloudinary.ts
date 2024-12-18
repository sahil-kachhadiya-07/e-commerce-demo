import axios from 'axios'

export const useImageUpload = async (image,foldername) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("foldername", foldername);
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
  
export const UseImageDelete = async (imageURL) => {
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

  export const useImageReplace = async (image , imageURL) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("imageURL", imageURL);
    try {
      const response = await axios.post("/api/replace-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image Replace successfully");
      return response.data;
    } catch (error) {
      console.log("Error in image Replace:", error.message);
      return { error: true, message: error.message }; 
    }
  };

  export const useMultipleImageUpload = async (imageList, foldername) => {
    if (!imageList) {
      alert('Please select files.');
      return;
    }
  
    const formData = new FormData();
    Array.from(imageList).forEach((file) => {
      formData.append('images', file as any);
    });
    formData.append('foldername', foldername);
  
    try {
      const response = await axios.post('/api/multiple-uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log('Images uploaded successfully');
        
        // Handle the array in the response
        const uploadedFiles = response.data;
        console.log('Uploaded Files:', uploadedFiles);
  
        return uploadedFiles;
      } else {
        console.error(response.data.error || 'Upload failed.');
        return null;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      return null;
    }
  };
  