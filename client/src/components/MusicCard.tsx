import { Download, Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  quality?: string;
}

interface MusicCardProps {
  track: MusicTrack;
  onDownload?: (track: MusicTrack) => void;
  onPlay?: (track: MusicTrack) => void;
}

export default function MusicCard({ track, onDownload, onPlay }: MusicCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    if (onDownload) {
      onDownload(track);
    }
    console.log('دانلود آهنگ:', track.title);
  };

  const handlePlay = () => {
    if (onPlay) {
      onPlay(track);
    }
    console.log('پخش آهنگ:', track.title);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? 'حذف از علاقه‌مندی‌ها' : 'اضافه به علاقه‌مندی‌ها');
  };

  return (
    <Card 
      className="group hover-elevate overflow-hidden transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-music-${track.id}`}
    >
      <CardContent className="p-4">
        <div className="relative aspect-square mb-3 rounded-md overflow-hidden bg-muted">
          <img 
            src={track.coverUrl} 
            alt={`کاور آلبوم ${track.album}`}
            className="w-full h-full object-cover"
            data-testid={`img-cover-${track.id}`}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
              <Button
                size="icon"
                className="w-12 h-12 rounded-full"
                onClick={handlePlay}
                data-testid={`button-play-${track.id}`}
              >
                <Play className="w-6 h-6" fill="currentColor" />
              </Button>
            </div>
          )}
          {track.quality && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              {track.quality}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-1" data-testid={`text-title-${track.id}`}>
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1" data-testid={`text-artist-${track.id}`}>
            {track.artist}
          </p>
          <p className="text-xs text-muted-foreground/80 line-clamp-1" data-testid={`text-album-${track.id}`}>
            {track.album}
          </p>
          
          <div className="flex items-center justify-between pt-2 gap-2">
            <span className="text-xs text-muted-foreground" data-testid={`text-duration-${track.id}`}>
              {track.duration}
            </span>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={handleLike}
                data-testid={`button-like-${track.id}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button
                size="sm"
                onClick={handleDownload}
                className="gap-1"
                data-testid={`button-download-${track.id}`}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">دانلود</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
