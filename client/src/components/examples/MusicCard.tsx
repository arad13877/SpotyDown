import MusicCard from '../MusicCard';

export default function MusicCardExample() {
  const sampleTrack = {
    id: '1',
    title: 'بی‌تفاوت',
    artist: 'رضا بهرام',
    album: 'آلبوم نمونه',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    quality: 'HD'
  };

  return (
    <div className="p-8">
      <div className="max-w-xs">
        <MusicCard track={sampleTrack} />
      </div>
    </div>
  );
}
