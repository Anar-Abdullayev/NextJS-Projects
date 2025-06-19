import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { mkdirSync, writeFileSync, existsSync } from 'fs';

export const runtime = 'nodejs';
export const maxDuration = 30;


const ALLOWED_EXT = ['.jpg', '.png', '.pdf'];
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req) {
  const formData = await req.formData();

  const firstName = formData.get('firstName')?.toString() ?? '';
  const lastName = formData.get('lastName')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const file = formData.get('file');

  if (!firstName || !lastName || !email || !file) {
    return NextResponse.json({ error: 'Fill in all inputs' }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (ext === '.exe' || !ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: 'Only .jpg, .png and .pdf files' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File cant be bigger than 5mb' }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  const timeStamp = Date.now();
  const safeName = `${timeStamp}-${file.name.replace(/[^a-z0-9.\-]/gi, '_')}`;
  const filePath = path.join(uploadsDir, safeName);

  const arrayBuffer = await file.arrayBuffer();
  writeFileSync(filePath, Buffer.from(arrayBuffer));

  const dataDir = path.join(process.cwd(), 'public', 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const entry = {
    firstName,
    lastName,
    email,
    fileName: safeName,
  };

  await fs.writeFile(path.join(dataDir, 'data.txt'), JSON.stringify(entry) + '\n');

  return Response.json(
    { message: 'Data uploaded successfully', fileName: safeName },
    { status: 200 }
  );
}
