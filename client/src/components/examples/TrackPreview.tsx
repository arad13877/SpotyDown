import TrackPreview from '../TrackPreview';
import { Button } from '@/components/ui/button';

export default function TrackPreviewExample() {
  const sampleTrack = {
    id: '1',
    title: 'بی‌تفاوت',
    artist: 'رضا بهرام',
    album: 'آلبوم نمونه',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    releaseYear: '1402',
    spotifyUrl: 'https://open.spotify.com/track/example'
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">حالت عادی</h3>
        <TrackPreview track={sampleTrack}>
          <Button>دانلود آهنگ</Button>
        </TrackPreview>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">حالت بارگذاری</h3>
        <TrackPreview track={sampleTrack} isLoading />
      </div>
    </div>
  );
}
