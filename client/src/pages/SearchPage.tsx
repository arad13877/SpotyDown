import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MusicGrid from "@/components/MusicGrid";
import { type MusicTrack } from "@/components/MusicCard";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // todo: remove mock functionality
  const searchResults: MusicTrack[] = query ? [
    {
      id: '1',
      title: 'بی‌تفاوت',
      artist: 'رضا بهرام',
      album: 'آلبوم اول',
      duration: '3:45',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      quality: 'HD'
    },
    {
      id: '2',
      title: 'قصه پریا',
      artist: 'محسن چاوشی',
      album: 'آلبوم دوم',
      duration: '4:12',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'دلم گرفته',
      artist: 'حمید هیراد',
      album: 'آلبوم سوم',
      duration: '3:30',
      coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
      quality: 'HD'
    },
  ] : [];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setHasSearched(true);
    
    // todo: remove mock functionality - Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      console.log('نتایج جستجو برای:', searchQuery);
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">جستجوی آهنگ</h1>
          <SearchBar variant="compact" onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">در حال جستجو...</p>
          </div>
        ) : hasSearched ? (
          <>
            {query && (
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                نتایج جستجو برای: <span className="text-primary">"{query}"</span>
              </h2>
            )}
            <MusicGrid tracks={searchResults} />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              نام آهنگ، هنرمند یا آلبوم مورد نظر خود را جستجو کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
