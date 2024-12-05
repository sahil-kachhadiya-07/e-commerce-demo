export function getPublicIdFromUrl(url) {
    const regex = /\/v\d+\/(.*)\.(\w+)$/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      return match[1]; // Returns the public ID (folder + filename without extension)
    }
  
    throw new Error('Invalid Cloudinary URL');
  }