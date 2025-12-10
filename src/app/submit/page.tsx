import { Metadata } from 'next';


// Import CSS Module
import styles from './submit.module.scss';
import VideoUploadForm from '@/src/components/ui/VideoUploadForm/VideoUploadForm';

export const metadata: Metadata = {
  title: "Submit Video | Mouse Farm Archive",
  description: "Send us your best hunting moments.",
};

export default function SubmitPage() {
  return (
    <main className={styles.main}>
      
      {/* HEADER (Nếu chưa có trong Layout thì thêm vào đây) */}
      
      {/* --- HEADER PAGE --- */}
      <div className={styles.header}>
         <h1>
           Submit Your <span>Footage</span>
         </h1>
         <p>
           Have an epic hunting moment? A perfect thermal shot? Or just a funny fail? 
           Upload it here and get featured on Mouse Farm!
         </p>
      </div>

      {/* --- CONTENT --- */}
      <div className={styles.container}>
        
        {/* Info Grid (Hướng dẫn nhanh) */}
        <div className={styles.infoGrid}>
           
           <div className={styles.card}>
              <span className={styles.icon}>📹</span>
              <h3>High Quality</h3>
              <p>Only HD/4K videos. No watermarks preferred.</p>
           </div>
           
           <div className={styles.card}>
              <span className={styles.icon}>⚖️</span>
              <h3>Own Content</h3>
              <p>You must own the rights to the video.</p>
           </div>
           
           <div className={styles.card}>
              <span className={styles.icon}>🎁</span>
              <h3>Get Rewards</h3>
              <p>Best clips of the month win gear & merch.</p>
           </div>

        </div>

        {/* NHÚNG FORM UPLOAD (Component đã tách style riêng) */}
        <VideoUploadForm />
        
        {/* Footer Text */}
        <p className={styles.termsText}>
          By submitting your video, you agree to Mouse Farm's <a href="#">Terms of Service</a> and grant us a perpetual, non-exclusive license to use this content.
        </p>

      </div>
    </main>
  );
}