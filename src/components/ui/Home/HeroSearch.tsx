'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import styles from '@/src/app/home.module.scss'; // Import lại file SCSS cũ

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Chuyển hướng chuẩn: /search?q=từ_khóa
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchWrapper}>
      <input 
        type="text" 
        placeholder="Search for videos, animals, gear..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className={styles.searchIcon} size={24} />
    </form>
  );
}