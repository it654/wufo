import { SearchX } from "lucide-react";
import Link from "next/link";

// Import SCSS Module
import styles from './search.module.scss';
import { client } from "@/src/sanity/lib/client";
import VideoCard from "@/src/components/video/VideoCard";
import SearchBar from "@/src/components/ui/SearchBar";

// 1. Hàm tìm kiếm video trong Sanity
async function searchVideos(queryStr: string) {
  if (!queryStr) return [];
  
  // Tìm video có title chứa từ khóa (không phân biệt hoa thường)
  // dấu * bao quanh để tìm 'contains'
  const query = `*[_type == "archiveVideo" && title match "*${queryStr}*"] | order(recordedAt desc) {
    _id, title, slug, category, thumbnail, recordedAt,
    "videoUrl": videoFile.asset->url
  }`;
  
  try {
    return await client.fetch(query, {}, { cache: 'no-store' });
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export const metadata = {
  title: "Search Results | Mouse Farm Archive",
  description: "Search results for hunting videos.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>; // Next.js 15: searchParams là Promise
}) {
  const { q } = await searchParams; // Lấy từ khóa từ URL
  const videos = await searchVideos(q);

  return (
    <div className={styles.main}>
      
      {/* HEADER PAGE (Nếu cần header chung thì import vào, ở đây dùng header layout) */}
      
      <div className={styles.container}>
        
        {/* --- KẾT QUẢ TÌM KIẾM --- */}
        <div className={styles.resultsHeader}>
          <h1>
            Search Results for: <span>&ldquo;{q}&rdquo;</span>
          </h1>
          <p>
            Found {videos.length} {videos.length === 1 ? 'result' : 'results'}.
          </p>
        </div>
        <SearchBar initialQuery={q} />
        {/* --- VIDEO GRID --- */}
        {videos.length > 0 ? (
          <div className={styles.grid}>
            {videos.map((video: any) => (
              // Bọc thẻ div để grid hoạt động đúng nếu component VideoCard không support class ngoài
              <div key={video._id} style={{ height: '100%' }}>
                 <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          // --- EMPTY STATE ---
          <div className={styles.noResults}>
            <div className={styles.icon}>
               <SearchX size={64} strokeWidth={1.5} />
            </div>
            <h3>No footage found</h3>
            <p>
              We couldn't find any videos matching "{q}". <br/>
              Try different keywords or browse our <Link href="/" style={{ color: '#ea580c', textDecoration: 'underline' }}>Full Library</Link>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}