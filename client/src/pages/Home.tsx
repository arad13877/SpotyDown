import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import MusicGrid from "@/components/MusicGrid";
import GenreCard, { type Genre } from "@/components/GenreCard";
import { type MusicTrack } from "@/components/MusicCard";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  // todo: remove mock functionality
  const popularTracks: MusicTrack[] = [
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
    {
      id: '4',
      title: 'یادت بخیر',
      artist: 'محمد علیزاده',
      album: 'آلبوم چهارم',
      duration: '4:05',
      coverUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
    },
    {
      id: '5',
      title: 'گل یخ',
      artist: 'سیروان خسروی',
      album: 'آلبوم پنجم',
      duration: '3:55',
      coverUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=400&h=400&fit=crop',
      quality: 'HD'
    },
    {
      id: '6',
      title: 'هر چی تو بخوای',
      artist: 'علی یاسینی',
      album: 'آلبوم ششم',
      duration: '4:20',
      coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    },
    {
      id: '7',
      title: 'دریا',
      artist: 'شادمهر عقیلی',
      album: 'آلبوم هفتم',
      duration: '3:48',
      coverUrl: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=400&h=400&fit=crop',
      quality: 'HD'
    },
    {
      id: '8',
      title: 'آخرین باری که',
      artist: 'بنیامین بهادری',
      album: 'آلبوم هشتم',
      duration: '4:15',
      coverUrl: 'https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=400&h=400&fit=crop',
    },
  ];

  // todo: remove mock functionality
  const genres: Genre[] = [
    { id: '1', name: 'پاپ' },
    { id: '2', name: 'راک' },
    { id: '3', name: 'رپ' },
    { id: '4', name: 'سنتی' },
    { id: '5', name: 'الکترونیک' },
    { id: '6', name: 'جز' },
  ];

  const handleSearch = (query: string) => {
    console.log('جستجو در صفحه اصلی:', query);
    setLocation('/search');
  };

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">ژانرهای محبوب</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">آهنگ‌های محبوب</h2>
          <MusicGrid tracks={popularTracks} />
        </section>
      </div>
    </div>
  );
}
