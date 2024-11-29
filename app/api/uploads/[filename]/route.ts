import { NextResponse } from 'next/server';
import { join } from 'path';
import { promises as fs } from 'fs';

export const GET = async (req: Request, { params }: { params: { filename: string } }) => {
  const { filename } = params;
  const filePath = join(process.cwd(), 'uploads', filename);

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/jpeg', // Adjust based on the file type
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found.' },
      { status: 404 }
    );
  }
};
