import { NextResponse } from 'next/server';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { promises as fs } from 'fs';

// Ensure uploads directory exists
const uploadDir = join(process.cwd(), 'uploads');
await fs.mkdir(uploadDir, { recursive: true }).catch(() => {});

async function saveFile(file: File, uploadDir: string): Promise<string> {
  const filePath = join(uploadDir, `${Date.now()}-${file.name}`);
  const stream = createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    const reader = file.stream().getReader();
    const decoder = new TextDecoder();

    function processChunk({ done, value }: ReadableStreamReadResult<Uint8Array>) {
      if (done) {
        stream.end();
        resolve(filePath);
        return;
      }

      stream.write(Buffer.from(value), (err) => {
        if (err) {
          reject(err);
          return;
        }
        reader.read().then(processChunk);
      });
    }

    reader.read().then(processChunk);
  });
}

export const POST = async (nextRequest: Request) => {
  try {
    const formData = await nextRequest.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded.' },
        { status: 400 }
      );
    }

    const savedFilePath = await saveFile(file, uploadDir);
    return NextResponse.json({
      message: 'File uploaded successfully.',
      filePath: savedFilePath,
    });
  } catch (error: any) {
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


