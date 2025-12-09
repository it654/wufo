'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './header.module.scss';
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn quá 50px thì bật chế độ nền tối
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <img src="logo.png" alt="logo" style={{width:"100px"}}/>
          <h1>
            MOUSE <span>FARM</span>
          </h1>
        </Link>

        {/* MENU */}
        <nav className={styles.nav}>
          <Link href="/video">Videos</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/submit" className={styles.submitBtn}>Submit Video</Link>
        </nav>

      </div>
    </header>
  );
}