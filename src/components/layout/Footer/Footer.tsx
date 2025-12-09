import Link from "next/link";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

// Import SCSS Module
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* --- TOP SECTION --- */}
        <div className={styles.topSection}>
          
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="logo.png" alt="logo" />
            <h1>
              MOUSE<br/><span>FARM</span>
            </h1>
          </Link>

          {/* Links (3 Cột) */}
          <div className={styles.navColumns}>
            <div className={styles.column}>
              <Link href="/video">Videos</Link>
              <Link href="#">Submit</Link>
            </div>
            <div className={styles.column}>
              <Link href="/about">About Us</Link>
              <Link href="#">Contact</Link>
            </div>
            <div className={styles.column}>
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
            </div>
          </div>
          {/* Socials */}
          <div className={styles.socials}>
            <a href="https://www.youtube.com/@mousefarm" className={styles.youtube} aria-label="YouTube"><FaYoutube /></a>
            <a href="#" className={styles.facebook} aria-label="Facebook"><FaFacebookF /></a>
            {/* <a href="#" className={styles.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className={styles.twitter} aria-label="Twitter"><FaTwitter /></a> */}
          </div>

        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className={styles.bottomSection}>
          <p>© 2024 Mouse Farm. All rights reserved.</p>
          <p>Designed by Sano Media</p>
        </div>

      </div>
    </footer>
  );
}