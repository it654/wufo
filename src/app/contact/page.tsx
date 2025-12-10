'use client';

import React, { useState, useRef } from 'react';
import styles from './contact.module.scss';
import toast from 'react-hot-toast'; // Dùng lại toast đã cài
import { sendContactEmail } from '../action';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Xử lý gửi form giả lập
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    // Gọi Server Action
    const result = await sendContactEmail(formData);

    if (result.success) {
      toast.success("Message sent! We'll get back to you soon. 🚀");
      formRef.current?.reset(); // Xóa trắng form sau khi gửi
    } else {
      toast.error(`Failed: ${result.error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* --- CỘT TRÁI: THÔNG TIN --- */}
        <div className={styles.infoColumn}>
          <h1 className={styles.heading}>
            Let's <br />
            <span>Work Together</span>
          </h1>
          
          <div className=""></div>
          <div className=""></div>
          <p className={styles.description}>
            Interested in partnering with Mouse Farm? We are always looking for strategic partnership opportunities for Advertising, Sponsorship or Content Licensing.
          </p>

          {/* Số liệu kênh (Hard-code hoặc lấy từ API) */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h4>1.2M+</h4>
              <p>Subscribers</p>
            </div>
            <div className={styles.statItem}>
              <h4>500M+</h4>
              <p>Total Views</p>
            </div>
            <div className={styles.statItem}>
              <h4>USA</h4>
              <p>Top Audience</p>
            </div>
            <div className={styles.statItem}>
              <h4>2016</h4>
              <p>Established</p>
            </div>
          </div>

          <div className={styles.contactDetails}>
            <h5>Direct Contact</h5>
            <a href="mailto:booking@mousefarm.com">booking@mousefarm.com</a>
            <a href="https://youtube.com/@mousefarm" target="_blank" style={{ fontSize: '1rem', marginTop: '1rem' }}>
              youtube.com/@mousefarm
            </a>
          </div>
        </div>

        {/* --- CỘT PHẢI: FORM --- */}
        <div className={styles.formColumn}>
          <form ref={formRef} onSubmit={handleSubmit}>

            <div className={styles.formGroup}>
              <label>What are you interested in?</label>
              {/* Thêm name="interest" để lấy dữ liệu */}
              <select name="interest" defaultValue="Sponsorship">
                <option value="Sponsorship">Sponsorship / Advertising</option>
                <option value="Licensing">Content Licensing</option>
                <option value="Other">Other Inquiry</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Your Name</label>
              {/* Thêm name="name" */}
              <input type="text" name="name" placeholder="John Doe" required />
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              {/* Thêm name="email" */}
              <input type="email" name="email" placeholder="john@company.com" required />
            </div>

            <div className={styles.formGroup}>
              <label>Message</label>
              {/* Thêm name="message" */}
              <textarea name="message" placeholder="Tell us about your project..." required></textarea>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}