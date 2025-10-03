import HistoryList from '../HistoryList';

export default function HistoryListExample() {
  const sampleTracks = [
    {
      id: '1',
      title: 'بی‌تفاوت',
      artist: 'رضا بهرام',
      album: 'آلبوم اول',
      duration: '3:45',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      spotifyUrl: 'https://open.spotify.com/track/1'
    },
    {
      id: '2',
      title: 'قصه پریا',
      artist: 'محسن چاوشی',
      album: 'آلبوم دوم',
      duration: '4:12',
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      spotifyUrl: 'https://open.spotify.com/track/2'
    },
  ];

  return (
    <div className="p-8">
      <HistoryList tracks={sampleTracks} onDownload={(track) => console.log('دانلود:', track.title)} />
    </div>
  );
}
