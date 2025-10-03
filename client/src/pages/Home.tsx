import { useState } from "react";
import { SiSpotify } from "react-icons/si";
import SpotifyLinkInput from "@/components/SpotifyLinkInput";
import TrackPreview, { type TrackInfo } from "@/components/TrackPreview";
import DownloadButton, { type QualityOption } from "@/components/DownloadButton";
import HistoryList from "@/components/HistoryList";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [history, setHistory] = useState<TrackInfo[]>([]);
  const { toast } = useToast();

  const handleFetchTrack = async (url: string, trackId: string) => {
    setIsLoading(true);
    
    // todo: remove mock functionality - Simulate API call
    setTimeout(() => {
      const mockTrack: TrackInfo = {
        id: trackId,
        title: 'نمونه آهنگ',
        artist: 'هنرمند نمونه',
        album: 'آلبوم نمونه',
        duration: '3:45',
        coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        releaseYear: '1402',
        spotifyUrl: url
      };
      
      setCurrentTrack(mockTrack);
      setIsLoading(false);
      
      setHistory(prev => {
        const filtered = prev.filter(t => t.id !== trackId);
        return [mockTrack, ...filtered].slice(0, 5);
      });

      toast({
        title: "اطلاعات آهنگ دریافت شد",
        description: "می‌توانید آهنگ را دانلود کنید",
      });
    }, 1500);
  };

  const handleDownload = (quality: QualityOption) => {
    if (!currentTrack) return;
    
    setIsDownloading(true);
    
    // todo: remove mock functionality - Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "دانلود با موفقیت آغاز شد",
        description: `${currentTrack.title} با کیفیت ${quality}kbps`,
      });
    }, 2000);
  };

  const handleHistoryDownload = (track: TrackInfo) => {
    setCurrentTrack(track);
    toast({
      title: "آماده دانلود",
      description: track.title,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)'
          }}
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <SiSpotify className="text-primary w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-l from-primary to-foreground bg-clip-text text-transparent">
              دانلود آهنگ از اسپاتیفای
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              لینک آهنگ اسپاتیفای خود را وارد کنید و با بهترین کیفیت دانلود کنید
            </p>

            <div className="pt-4">
              <SpotifyLinkInput 
                onSubmit={handleFetchTrack}
                isLoading={isLoading}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-1">
                ✓ کیفیت 320kbps
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ✓ دانلود سریع
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ✓ رایگان و نامحدود
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
        {isLoading && (
          <TrackPreview 
            track={{} as TrackInfo} 
            isLoading={true}
          />
        )}

        {currentTrack && !isLoading && (
          <TrackPreview track={currentTrack}>
            <DownloadButton 
              onDownload={handleDownload}
              isDownloading={isDownloading}
            />
          </TrackPreview>
        )}

        {history.length > 0 && (
          <HistoryList 
            tracks={history}
            onDownload={handleHistoryDownload}
          />
        )}

        {!currentTrack && !isLoading && history.length === 0 && (
          <div className="text-center py-12 space-y-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">چگونه کار می‌کند؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
                <div className="p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">۱</div>
                  <h3 className="font-semibold mb-2">لینک را کپی کنید</h3>
                  <p className="text-sm text-muted-foreground">
                    لینک آهنگ مورد نظر را از اسپاتیفای کپی کنید
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">۲</div>
                  <h3 className="font-semibold mb-2">لینک را وارد کنید</h3>
                  <p className="text-sm text-muted-foreground">
                    لینک را در کادر بالا وارد کرده و دکمه دریافت را بزنید
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-card border border-border">
                  <div className="text-3xl font-bold text-primary mb-2">۳</div>
                  <h3 className="font-semibold mb-2">دانلود کنید</h3>
                  <p className="text-sm text-muted-foreground">
                    کیفیت دلخواه را انتخاب کرده و آهنگ را دانلود کنید
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
