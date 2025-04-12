import { NextResponse } from 'next/server';
import { generateThumbnail } from '@/lib/thumbnail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, style } = body;

    if (!title || !description || !style) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const thumbnailUrl = await generateThumbnail({ title, description, style });

    return NextResponse.json({ url: thumbnailUrl });
  } catch (error) {
    console.error('Error in thumbnail generation:', error);
    return NextResponse.json(
      { error: 'Failed to generate thumbnail' },
      { status: 500 }
    );
  }
}