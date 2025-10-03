import { useState } from "react";
import MusicGrid from "@/components/MusicGrid";
import { type MusicTrack } from "@/components/MusicCard";
import { Heart, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Library() {
  // todo: remove mock functionality
  const likedTracks: MusicTrack[] = [
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
  ];

  // todo: remove mock functionality
  const downloadedTracks: MusicTrack[] = [
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
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">کتابخانه من</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="liked" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="liked" className="gap-2" data-testid="tab-liked">
              <Heart className="w-4 h-4" />
              علاقه‌مندی‌ها
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2" data-testid="tab-downloads">
              <Download className="w-4 h-4" />
              دانلودها
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="liked" data-testid="content-liked">
            <h2 className="text-xl font-semibold mb-6">آهنگ‌های مورد علاقه ({likedTracks.length})</h2>
            <MusicGrid tracks={likedTracks} />
          </TabsContent>
          
          <TabsContent value="downloads" data-testid="content-downloads">
            <h2 className="text-xl font-semibold mb-6">آهنگ‌های دانلود شده ({downloadedTracks.length})</h2>
            <MusicGrid tracks={downloadedTracks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
