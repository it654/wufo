import { useState } from 'react';
import * as tus from 'tus-js-client';
import toast from 'react-hot-toast';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadVideoToBunny = async (file: File, title: string): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
      setUploading(true);
      
      // 1. Gọi API lấy Signature
      const res = await fetch('/api/bunny/sign', {
        method: 'POST',
        body: JSON.stringify({ title: title || file.name }),
      });
      
      const { videoId, libraryId, signature, expirationTime, error } = await res.json();
      
      if (error || !videoId) {
        toast.error('Lỗi khởi tạo upload');
        setUploading(false);
        return resolve(null);
      }

      // 2. Bắt đầu upload TUS với Signature
      const upload = new tus.Upload(file, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000],
        headers: {
          // CÁC HEADER BẮT BUỘC CỦA BUNNY
          'AuthorizationSignature': signature, // Chữ ký bảo mật
          'AuthorizationExpire': expirationTime.toString(), // Thời gian hết hạn
          'VideoId': videoId,
          'LibraryId': libraryId.toString(),
        },
        metadata: {
          filetype: file.type,
          title: title || file.name,
        },
        onError: (error) => {
          console.error('TUS Error:', error);
          toast.error('Upload failed: ' + error.message);
          setUploading(false);
          resolve(null);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = (bytesUploaded / bytesTotal) * 100;
          setProgress(Math.round(percentage));
        },
        onSuccess: () => {
          toast.success('Upload successful!');
          setUploading(false);
          resolve(videoId);
        },
      });

      upload.start();
    });
  };

  return { uploadVideoToBunny, uploading, progress };
};