import { useState } from "react";
import { SiSpotify } from "react-icons/si";
import SpotifyLinkInput from "@/components/SpotifyLinkInput";
import TrackPreview, { type TrackInfo } from "@/components/TrackPreview";
import DownloadButton, { type QualityOption } from "@/components/DownloadButton";
import HistoryList from "@/components/HistoryList";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: history = [] } = useQuery<TrackInfo[]>({
    queryKey: ['/api/history'],
  });

  const fetchTrackMutation = useMutation({
    mutationFn: async (trackId: string) => {
      const trackRes = await apiRequest('GET', `/api/track/${trackId}`);
      const trackInfo = await trackRes.json();
      
      const searchQuery = `${trackInfo.artist} ${trackInfo.title} audio`;
      const youtubeRes = await apiRequest('POST', '/api/search-youtube', { query: searchQuery });
      const youtubeResult = await youtubeRes.json();
      
      return { trackInfo, youtubeUrl: youtubeResult.url };
    },
    onSuccess: ({ trackInfo, youtubeUrl }) => {
      setCurrentTrack(trackInfo);
      setYoutubeUrl(youtubeUrl);
      
      toast({
        title: "اطلاعات آهنگ دریافت شد",
        description: "می‌توانید آهنگ را دانلود کنید",
      });

      queryClient.invalidateQueries({ queryKey: ['/api/history'] });
    },
    onError: (error: any) => {
      toast({
        title: "خطا در دریافت اطلاعات",
        description: error.message || "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async ({ quality }: { quality: QualityOption }) => {
      if (!youtubeUrl || !currentTrack) {
        throw new Error("اطلاعات کامل نیست");
      }

      const downloadRes = await apiRequest('POST', '/api/download', { 
        youtubeUrl, 
        quality 
      });
      const downloadData = await downloadRes.json();

      await apiRequest('POST', '/api/history', {
        spotifyTrackId: currentTrack.id,
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        duration: currentTrack.duration,
        coverUrl: currentTrack.coverUrl,
        releaseYear: currentTrack.releaseYear,
        spotifyUrl: currentTrack.spotifyUrl,
        youtubeUrl: youtubeUrl,
      });

      return downloadData;
    },
    onSuccess: (data) => {
      window.open(data.downloadUrl, '_blank');
      
      toast({
        title: "دانلود آغاز شد",
        description: `${currentTrack?.title} با کیفیت ${data.quality}kbps`,
      });

      queryClient.invalidateQueries({ queryKey: ['/api/history'] });
    },
    onError: (error: any) => {
      toast({
        title: "خطا در دانلود",
        description: error.message || "لطفاً دوباره تلاش کنید",
        variant: "destructive",
      });
    },
  });

  const handleFetchTrack = async (url: string, trackId: string) => {
    fetchTrackMutation.mutate(trackId);
  };

  const handleDownload = (quality: QualityOption) => {
    if (!currentTrack) return;
    downloadMutation.mutate({ quality });
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
                isLoading={fetchTrackMutation.isPending}
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
        {fetchTrackMutation.isPending && (
          <TrackPreview 
            track={{} as TrackInfo} 
            isLoading={true}
          />
        )}

        {currentTrack && !fetchTrackMutation.isPending && (
          <TrackPreview track={currentTrack}>
            <DownloadButton 
              onDownload={handleDownload}
              isDownloading={downloadMutation.isPending}
            />
          </TrackPreview>
        )}

        {history.length > 0 && (
          <HistoryList 
            tracks={history}
            onDownload={handleHistoryDownload}
          />
        )}

        {!currentTrack && !fetchTrackMutation.isPending && history.length === 0 && (
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
