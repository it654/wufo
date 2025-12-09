import Link from "next/link";
import { FaCloudUploadAlt } from "react-icons/fa";
// Import file style module
import styles from './home.module.scss';
import { client } from "../sanity/lib/client";
import VideoCard from "../components/video/VideoCard";
import ContactPage from "./contact/page";
import SubmitVideo from "../components/ui/SubmitVideo/SubmitVideo";
import VideoUploadForm from "../components/ui/VideoUploadForm/VideoUploadForm";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: true });


// --- DATA FETCHING ---
async function getAllCategories() {
  const query = `*[_type == "archiveVideo" && defined(category)].category`;
  const categories = await client.fetch(query, {}, { cache: 'no-store' });
  const uniqueCategories = [...new Set(categories)].filter(Boolean) as string[];
  return uniqueCategories.sort();
}

async function getVideosByCategory(category: string) {
  const query = `*[_type == "archiveVideo" && category == "${category}"] | order(recordedAt desc) [0...4] {
    _id, title, slug, category, thumbnail, recordedAt,
    "videoUrl": videoFile.asset->url
  }`;
  try { return await client.fetch(query, {}, { cache: 'no-store' }); } catch (error) { return []; }
}

async function getLatestVideos() {
  const query = `*[_type == "archiveVideo"] | order(recordedAt desc) [0...8] {
    _id, title, slug, category, thumbnail, recordedAt,
    "videoUrl": videoFile.asset->url
  }`;
  try { return await client.fetch(query, {}, { cache: 'no-store' }); } catch (error) { return []; }
}

// --- COMPONENTS ---

// 1. Hero Section
const HeroSection = ({ heroVideo }: { heroVideo: any }) => {
  const VIDEO_ID = "cbQvj9Ug-7Y"

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoBackground}>
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
          playing={true}     // Tự động chạy
          loop={true}        // Lặp lại
          muted={true}       // Tắt tiếng (Bắt buộc để autoplay)
          width="100%"
          height="100%"
          controls={false}   // Ẩn điều khiển
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                modestbranding: 1,
                controls: 0,
                rel: 0, // Không gợi ý video kênh khác
                disablekb: 1, // Tắt phím tắt
                iv_load_policy: 3 // Tắt chú thích
              }
            }
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.5)', // Scale to lên để che 2 viền đen nếu có
            pointerEvents: 'none' // Không cho user bấm vào video nền
          }}
        />
      </div>

      <div className={styles.overlay}></div>

      <div className={styles.heroContent}>
        <h1>
          KHO TÀNG <span>SĂN BẮN</span>
        </h1>
        <p>Tổng hợp những pha hành động thực chiến đỉnh cao nhất.</p>

        {heroVideo && (
          <Link href={`/video/${heroVideo.slug.current}`} className={styles.ctaButton}>
            Xem Video Mới Nhất
          </Link>
        )}
      </div>
    </section>
  );
}
// 2. Submit CTA
const SubmitCTA = () => (
  <section className={styles.submitBar}>
    <div className={styles.container}>
      <FaCloudUploadAlt className={styles.icon} />
      <h2>Bạn có video "chất"?</h2>
      <p>Gửi ngay cho chúng tôi để xuất hiện trên trang chủ.</p>
      <Link href="/submit" className={styles.submitBtn}>
        Gửi Video Ngay
      </Link>
    </div>
  </section>
);

// 3. Dynamic Section (Tái sử dụng cho cả Latest và Categories)
const SectionGrid = ({ title, videos, linkUrl }: { title: string, videos: any[], linkUrl: string }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <Link href={linkUrl} className={styles.viewAll}>
          View All
        </Link>
      </div>
      <div className={styles.grid}>
        {videos.map((video: any) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
};

// 4. Wrapper cho Category Động
const DynamicCategorySection = async ({ category }: { category: string }) => {
  const videos = await getVideosByCategory(category);
  // Format tên đẹp (viết hoa chữ đầu)
  const displayTitle = category.charAt(0).toUpperCase() + category.slice(1);
  return <SectionGrid title={displayTitle} videos={videos} linkUrl={`/category/${category}`} />;
};

const WelcomeSection = () => {
  return (
    <section className={styles.welcomeSection}>
      <div className={styles.welcomeContainer}>

        {/* CỘT TRÁI: ẢNH MINH HỌA */}
        <div className={styles.imageWrapper}>
          {/* Thay src bằng ảnh thật của bạn */}
          <img
            src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=2071&auto=format&fit=crop"
            alt="Filming crew"
          />
        </div>

        {/* CỘT PHẢI: NỘI DUNG */}
        <div className={styles.textContent}>

          {/* Khối 1: WELCOME */}
          <div className="mb-10">
            <h2>Welcome</h2>
            <p>
              Mouse Farm Archive is the definitive source for high-quality hunting and pest control footage.
              Our library features thousands of clips ranging from thermal night vision hunts to helicopter operations.
              We capture the raw intensity of agricultural protection.
            </p>
          </div>

          {/* Khối 2: LICENSING */}
          <div className={styles.licensingBlock}>
            <h2>Licensing</h2>
            <p>
              We specialize in licensing and clearance of top-tier hunting content.
              We have established relationships with brands, television studios, and news outlets to provide top-quality video for your projects.
              <br /><br />
              Browse for free or create an account for VIP Access to our library.
            </p>

            {/* Nút Liên Hệ */}
            <Link href="/contact" className={styles.ctaButton}>
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default async function Home() {
  const latestVideos = await getLatestVideos();
  const categories = await getAllCategories();
  const heroVideo = latestVideos[0];

  return (
    <main className={styles.main}>

      {/* Hero */}
      <HeroSection heroVideo={heroVideo} />

      <WelcomeSection />

      {/* Submit Bar */}
      {/* <SubmitCTA /> */}
      <VideoUploadForm />
      {/*   <section className="py-20 px-6 bg-zinc-950 border-y border-zinc-900">
      </section> */}
      {/* <div className={styles.container}> */}

      {/* Latest Videos */}
      {/* <SectionGrid title="Video Mới Nhất" videos={latestVideos} linkUrl="/category/latest" /> */}

      {/* Dynamic Categories */}
      {/* {categories.map((cat) => (
          <DynamicCategorySection key={cat} category={cat} />
        ))} */}

      {/* </div> */}
    </main>
  );
}