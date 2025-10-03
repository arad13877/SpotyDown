import MusicGrid from '../MusicGrid';

export default function MusicGridExample() {
  const sampleTracks = [
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
  ];

  return (
    <div className="p-8">
      <MusicGrid tracks={sampleTracks} />
    </div>
  );
}
