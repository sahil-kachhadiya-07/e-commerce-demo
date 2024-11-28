import { NextResponse } from 'next/server';
import multer from 'multer';
import { NextRequest } from 'next/server';
import { extname, join } from 'path';
import { promises as fs } from 'fs';

// Ensure uploads directory exists
const uploadDir = join(process.cwd(), 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(() => {});

// Configure multer
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export const POST = async (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    upload.single('file')(req as any, {} as any, (err: any) => {
      if (err) {
        reject(
          NextResponse.json(
            { error: 'File upload failed.' },
            { status: 500 }
          )
        );
        return;
      }

      const file = (req as any).file;
      if (!file) {
        resolve(
          NextResponse.json(
            { error: 'No file uploaded.' },
            { status: 400 }
          )
        );
        return;
      }

      resolve(
        NextResponse.json({
          message: 'File uploaded successfully.',
          filePath: `/uploads/${file.filename}`, // File path for client use
        })
      );
    });
  });
};
