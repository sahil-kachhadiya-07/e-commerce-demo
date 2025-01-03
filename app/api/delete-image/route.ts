import { getPublicIdFromUrl } from '@/app/utils/common';
import { v2 as cloudinary } from 'cloudinary';

// Set up Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('imageUrl');

    if (!imageUrl) {
      return new Response(JSON.stringify({ message: 'Image URL is required' }), {
        status: 400,
      });
    }

    const publicId = getPublicIdFromUrl(imageUrl);
    console.log('Extracted publicId:', publicId);

    // Call Cloudinary's delete method
    const result = await cloudinary.uploader.destroy(publicId);

    console.log('Cloudinary delete result:', result);  // Log the full response for debugging

    if (result.result === 'ok') {
      return new Response(JSON.stringify({ message: 'Image deleted successfully' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'Failed to delete image' }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
