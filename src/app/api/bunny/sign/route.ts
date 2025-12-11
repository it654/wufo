import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
    const apiKey = process.env.BUNNY_API_KEY;

    if (!libraryId || !apiKey) {
      return NextResponse.json({ error: 'Missing Bunny Config' }, { status: 500 });
    }

    // 1. Tạo Video Placeholder trên Bunny trước
    const createRes = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
      method: 'POST',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!createRes.ok) {
      const errorText = await createRes.text();
      console.error("Bunny Create Error:", errorText);
      return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
    }
  
    const videoData = await createRes.json();
    const videoId = videoData.guid;

    // 2. Tạo Chữ Ký Bảo Mật (Signature) cho TUS
    // Công thức: libraryId + apiKey + expirationTime + videoId
    const expirationTime = Math.floor(Date.now() / 1000) + 3600; // Hết hạn sau 1 giờ
    const dataToSign = libraryId + apiKey + expirationTime + videoId;
    const signature = crypto.createHash('sha256').update(dataToSign).digest('hex');

    return NextResponse.json({ 
      videoId,
      libraryId,
      signature,
      expirationTime
    });

  } catch (error) {
    console.error("Sign API Error:", error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}