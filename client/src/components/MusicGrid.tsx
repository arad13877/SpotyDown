import MusicCard, { type MusicTrack } from "./MusicCard";

interface MusicGridProps {
  tracks: MusicTrack[];
  onDownload?: (track: MusicTrack) => void;
  onPlay?: (track: MusicTrack) => void;
}

export default function MusicGrid({ tracks, onDownload, onPlay }: MusicGridProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">هیچ آهنگی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {tracks.map((track) => (
        <MusicCard 
          key={track.id} 
          track={track} 
          onDownload={onDownload}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}
