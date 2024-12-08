import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function bufferToStream(buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}

async function uploadToCloudinary(fileBuffer, foldername) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: foldername }, // Optional folder name
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve(result.secure_url);
        }
      }
    );

    bufferToStream(fileBuffer).pipe(uploadStream);
  });
}

export const POST = async (nextRequest) => {
  try {
    const formData = await nextRequest.formData();
    const files = formData.getAll('images'); // Get all uploaded files
    const foldername = formData.get('foldername');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded.' }, { status: 400 });
    }

    // Validate that all files are instances of Blob (which they should be)
    if (files.some(file => !(file instanceof Blob))) {
      return NextResponse.json({ error: 'Invalid file type uploaded.' }, { status: 400 });
    }

    // Upload all files simultaneously using Promise.all
    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return uploadToCloudinary(buffer, foldername);
    });

    // Wait for all uploads to complete
    const uploadedUrls = await Promise.all(uploadPromises);

    return NextResponse.json({
      message: 'Files uploaded successfully.',
      fileUrls: uploadedUrls,
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
};

export const config = {
  runtime: 'nodejs',
};
