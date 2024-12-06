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

async function uploadToCloudinary(fileBuffer , foldername) {
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
    const file = formData.get('image');
    const foldername = formData.get('foldername');
    console.log('file', file)

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded or invalid file type.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadedUrl = await uploadToCloudinary(buffer , foldername);
    return NextResponse.json({
      message: 'File uploaded successfully.',
      fileUrl: uploadedUrl,
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
