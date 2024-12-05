import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert buffer to stream
function bufferToStream(buffer: Buffer) {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
}

// Upload image to Cloudinary (or replace if public_id is provided)
async function uploadToCloudinary(fileBuffer: Buffer, publicId?: string) {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = { folder: 'uploads', overwrite: true };

    // If public_id is provided, use it to replace the image
    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          resolve(result.secure_url); // Returning the secure URL of the uploaded image
        }
      }
    );

    bufferToStream(fileBuffer).pipe(uploadStream);
  });
}

export const POST = async (nextRequest: Request) => {
  try {
    // Parse form data from the request
    const formData = await nextRequest.formData();
    const file = formData.get('image');
    const publicId = formData.get('public_id') as string;

    // Ensure a valid file is uploaded
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded or invalid file type.' }, { status: 400 });
    }

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // If public_id is provided, replace the image. Otherwise, upload a new one.
    const uploadedUrl = await uploadToCloudinary(buffer, publicId);

    return NextResponse.json({
      message: publicId ? 'Image replaced successfully.' : 'File uploaded successfully.',
      fileUrl: uploadedUrl,
    });
  } catch (error: any) {
    console.error('Server error:', error);

    // Return error details for troubleshooting
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
};

export const config = {
  runtime: 'nodejs', // Ensures the function runs on Node.js runtime
};
