import Link from "next/link";
import { FaCloudUploadAlt, FaRocket } from "react-icons/fa";
// Import file style module
import styles from './home.module.scss';
import { client } from "../sanity/lib/client";
import VideoCard from "../components/video/VideoCard";
import VideoUploadForm from "../components/ui/VideoUploadForm/VideoUploadForm";
import dynamic from 'next/dynamic';
import HeroSearch from "../components/ui/Home/HeroSearch";
import Image from "next/image";
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
  const VIDEO_ID = "N3qI5G7jpus"

  return (
    <section className={styles.heroSection}>
        {/* Video nền: Bạn nên tải video sao trời loop về folder public */}
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
              showinfo: 0,
              modestbranding: 1,
              controls: 0,
              rel: 0, // Không gợi ý video kênh khác
              disablekb: 1, // Tắt phím tắt
              iv_load_policy: 3 // Tắt chú thích
            } as any
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

        {/* Lớp phủ tối */}
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <span className={styles.tagline}>Archive Transmission</span>
          <h1>
            Exploring The <br />
            <strong>Unknown Cosmos</strong>
          </h1>
          <p>
            A journey to explore humanity's ultimate frontier. From distant exoplanets to the mysteries of cosmic black holes.
          </p>
          <Link href="/video" className={styles.ctaButton}>
            Start The Journey <FaRocket />
          </Link>
        </div>
      </section>
  );
}
// 2. Submit CTA
/* const SubmitCTA = () => (
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
); */

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
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* --- CỘT HÌNH ẢNH (Bên trái) --- */}
        <div className={styles.visualColumn}>
          {/* Vòng trang trí xoay tròn */}
          <div className={styles.orbitCircle}></div>
          
          <div className={styles.imageWrapper}>
            <Image 
              // Thay ảnh đại diện kênh Wufo vào đây
              src="https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1000&auto=format&fit=crop" 
              alt="Wufo Mission Commander"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              priority
            />
          </div>
        </div>

        {/* --- CỘT NỘI DUNG (Bên phải) --- */}
        <div className={styles.textColumn}>
          <div className={styles.label}>
             Incoming Transmission
          </div>
          
          <h2>
            Decoding The <br />
            <strong>Universe's Secrets</strong>
          </h2>
          
          <p>
            Welcome to Wufo Space Station. This is more than just a video archive; it's where we unravel the universe's greatest mysteries together: from the birth of stars to the stillness of supermassive black holes.
          </p>
          
          <p>
            Each documentary is a journey to find answers to the question:<em>"Are we alone in this universe?"</em>
          </p>

          {/* Social Proof / Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <h4>500+</h4>
              <span>Expeditions</span>
            </div>
            <div className={styles.stat}>
              <h4>1.2M</h4>
              <span>Explorers</span>
            </div>
            <div className={styles.stat}>
              <h4>4K</h4>
              <span>Resolution</span>
            </div>
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