import { apiVersion, dataset, projectId } from '@/src/sanity/env';
import { createClient } from 'next-sanity';

import { NextResponse } from 'next/server';

// Tạo client riêng có quyền GHI (Write)
/* const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Lấy token từ biến môi trường
  useCdn: false, // Không cache khi ghi
});
 */
export async function POST(request: Request) {
  const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Lấy token từ biến môi trường
  useCdn: false, // Không cache khi ghi
});
  try {
    const body = await request.json();
    const { title, description, videoAssetId, authorName, authorEmail } = body;

    // Validate cơ bản
    if (!title || !videoAssetId || !authorName) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Ghi vào Sanity
    const result = await writeClient.create({
      _type: 'submission', // Tên schema bạn vừa tạo
      title,
      description,
      videoFile: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: videoAssetId // ID file trong Sanity
        }
      },
      authorName,
      authorEmail,
      token: process.env.SANITY_API_TOKEN,
    });

    return NextResponse.json({ message: 'Thành công', id: result._id }, { status: 201 });

  } catch (error: any) {
    console.error("Submission Error:", error);
    return NextResponse.json({ message: 'Lỗi Server' }, { status: 500 });
  }
}