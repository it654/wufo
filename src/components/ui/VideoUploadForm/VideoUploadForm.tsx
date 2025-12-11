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
    bunnyVideoId: '',
    authorName: '',
    authorEmail: '',
    status: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadVideoToBunny, uploading, progress } = useUpload();;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate nhanh
    if (!file.type.startsWith('video/')) {
      toast.error('Vui lòng chọn file video!');
      return;
    }

    // Gọi hàm upload (Truyền thêm title tạm để Bunny tạo placeholder)
    // Nếu chưa nhập title thì lấy tên file
    const videoTitle = formData.title || file.name;

    const videoId = await uploadVideoToBunny(file, videoTitle);

    if (videoId) {
      setFormData({ ...formData, bunnyVideoId: videoId });
      toast.success('Upload successful');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.bunnyVideoId) {
      toast.error("Please wait for the video to finish uploading!");
      return;
    }

    const toastId = toast.loading("Sending information...");

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Send failure');

      toast.success("Submission successful! Admin will review the post.", { id: toastId });

      // Reset form
      setFormData({ title: '', description: '', bunnyVideoId: '', authorName: '', authorEmail: '' });

    } catch (error) {
      toast.error("Error", { id: toastId });
    }
  };

  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <h2>
          Submit Your <span>Video</span>
        </h2>
        <p>Share your best hunting moments with our global community.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>

        {/* --- KHU VỰC UPLOAD --- */}
        <div className={styles.uploadArea}>
           <input 
             type="file" accept="video/*" onChange={handleFileChange}
             disabled={uploading || !!formData.bunnyVideoId}
           />
           
           {uploading ? (
             <div className={styles.loadingState}>
               <FaSpinner className={styles.spinner} />
               <span>Uploading to Bunny... {progress}%</span>
               {/* Progress bar visual */}
               <div className="w-full h-1 bg-zinc-700 mt-2 rounded overflow-hidden">
                  <div className="h-full bg-orange-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
               </div>
             </div>
           ) : formData.bunnyVideoId ? (
             <div className={styles.successState}>
                <FaCheckCircle className={styles.checkIcon} />
                <p className={styles.successText}>Video Uploaded!</p>
                <p className={styles.fileName}>ID: {formData.bunnyVideoId}</p>
                
                {/* Nút Xóa / Upload lại */}
                <button
                   type="button"
                   onClick={() => setFormData({ ...formData, bunnyVideoId: '' })}
                   className={styles.anotherFile}  
                >
                   Upload another file
                </button>
             </div>
           ) : (
             <div className={styles.defaultState}>
               <FaCloudUploadAlt className={styles.icon} />
               <h3 className={styles.ctaText}>Drag & Drop Video</h3>
               <p className={styles.subText}>Direct to Bunny Stream (Max 1GB)</p>
             </div>
           )}
        </div>

        {/* --- CÁC TRƯỜNG THÔNG TIN --- */}
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Video Title</label>
            <input
              type="text" required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g. Epic Thermal Shot..."
            />
          </div>
          <div className={styles.field}>
            <label>Tên của bạn</label>
            <input
              type="text" required
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              placeholder="E.g. John Doe"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about the context..."
          />
        </div>

        {/* --- NÚT SUBMIT --- */}
        <button
          type="submit"
          disabled={!formData.bunnyVideoId || isSubmitting}
          className={styles.submitBtn}
        >
          <FaPaperPlane /> SEND FOOTAGE
        </button>

      </form>
    </div>
  );
}