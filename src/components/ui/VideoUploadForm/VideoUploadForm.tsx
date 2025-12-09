'use client';

import React, { useState } from 'react';

import { FaCloudUploadAlt, FaSpinner, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Import CSS Module
import styles from './videoUploadForm.module.scss';
import { useUpload } from '@/src/hooks/useUpload';

export default function VideoUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    authorName: '',
    authorEmail: ''
  });
  
  const { uploadFile, uploading } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
        toast.error('Vui lòng chọn file video!');
        return;
    }
    
    // Gọi hàm upload
    const url = await uploadFile(file);
    if (url) {
      setFormData({ ...formData, videoUrl: url });
      toast.success('Video đã được tải lên! Hãy điền nốt thông tin.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic gửi form lên API (lưu vào Sanity hoặc Database)
    // await submitToSanity(formData)...
    
    toast.success('Cảm ơn bạn đã đóng góp video!');
    setFormData({ title: '', description: '', videoUrl: '', authorName: '', authorEmail: '' });
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <h2>
          Submit Your <span>Video</span>
        </h2>
        <p>Chia sẻ những khoảnh khắc săn bắn ấn tượng nhất của bạn với cộng đồng.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* --- KHU VỰC UPLOAD --- */}
        <div className={styles.uploadArea}>
           {/* Input file ẩn, luôn active trừ khi đang upload */}
           <input 
             type="file" 
             accept="video/*" 
             onChange={handleFileChange}
             disabled={uploading || !!formData.videoUrl}
           />
           
           {uploading ? (
             <div className={styles.loadingState}>
               <FaSpinner className={styles.spinner} />
               <span>Đang tải video lên...</span>
             </div>
           ) : formData.videoUrl ? (
             <div className={styles.successState}>
                <FaCheckCircle className={styles.checkIcon} />
                <p className={styles.successText}>Video đã sẵn sàng!</p>
                <p className={styles.fileName}>{formData.videoUrl}</p>
             </div>
           ) : (
             <div className={styles.defaultState}>
               <FaCloudUploadAlt className={styles.icon} />
               <h3 className={styles.ctaText}>Kéo thả hoặc bấm để chọn video</h3>
               <p className={styles.subText}>MP4, MOV (Max 500MB)</p>
             </div>
           )}
        </div>

        {/* --- CÁC TRƯỜNG THÔNG TIN --- */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Tiêu đề Video</label>
            <input 
              type="text" required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="VD: Cú bắn để đời..."
            />
          </div>
          <div className={styles.field}>
            <label>Tên của bạn</label>
            <input 
              type="text" required
              value={formData.authorName}
              onChange={(e) => setFormData({...formData, authorName: e.target.value})}
              placeholder="VD: Nguyễn Văn A"
            />
          </div>
        </div>

        <div className={styles.field}>
            <label>Mô tả ngắn</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Kể thêm về bối cảnh video này..."
            />
        </div>

        {/* --- NÚT SUBMIT --- */}
        <button 
          type="submit"
          disabled={!formData.videoUrl || uploading}
          className={styles.submitBtn}
        >
          <FaPaperPlane /> Gửi Video Ngay
        </button>

      </form>
    </div>
  );
}