import Image from "next/image";
import styles from './about.module.scss';

export const metadata = {
  title: "About Us | WUFO Archive",
  description: "The premier archive for hunting and pest control footage.",
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* 1. HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>
              We are <br/>
              <span>WUFO</span>
            </h1>
            <p>
              Founded in 2016, WUFO has evolved into the world's leading digital archive for raw hunting footage. 
              We specialize in thermal vision operations, helicopter pest control, and high-precision trapping techniques.
            </p>
          </div>
          
          <div className={styles.heroImage}>
            {/* Ảnh team/hoạt động (Bạn thay link ảnh thật vào đây) */}
            <Image 
              src="https://i.ibb.co/KccXPLkq/image1.jpg" 
              alt="WUFO Operations Team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* 2. STATS SECTION (Số liệu ấn tượng) */}
        <section className={styles.stats}>
          <div className={styles.statItem}>
            <h3>2016</h3>
            <p>Established</p>
          </div>
          <div className={styles.statItem}>
            <h3>1.2M+</h3>
            <p>Subscribers</p>
          </div>
          <div className={styles.statItem}>
            <h3>500M+</h3>
            <p>Total Views</p>
          </div>
          <div className={styles.statItem}>
            <h3>2000+</h3>
            <p>Original Clips</p>
          </div>
        </section>

        {/* 3. MISSION / STORY */}
        <section className={styles.story}>
          <h2>The Mission</h2>
          <div className={styles.content}>
            <p>
              "Agriculture protection is not just a job, it's a necessity. We document the raw reality of pest control to educate, inform, and preserve the balance of our ecosystem."
            </p>
            <p>
              Every clip in our archive is verified, copyright-protected, and available for licensing to major networks and documentaries worldwide.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}