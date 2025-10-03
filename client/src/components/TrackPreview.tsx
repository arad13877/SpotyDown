import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "lucide-react";

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
  releaseYear?: string;
  spotifyUrl: string;
}

interface TrackPreviewProps {
  track: TrackInfo;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function TrackPreview({ track, children, isLoading = false }: TrackPreviewProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6 animate-pulse">
            <div className="w-full sm:w-48 h-48 bg-muted rounded-md" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto" data-testid={`track-preview-${track.id}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-48 h-48 rounded-md overflow-hidden bg-muted flex-shrink-0">
            {track.coverUrl ? (
              <img 
                src={track.coverUrl} 
                alt={`کاور ${track.title}`}
                className="w-full h-full object-cover"
                data-testid={`img-track-cover-${track.id}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" data-testid={`text-track-title-${track.id}`}>
                  {track.title}
                </h2>
                <p className="text-lg text-muted-foreground" data-testid={`text-track-artist-${track.id}`}>
                  {track.artist}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span data-testid={`text-track-album-${track.id}`}>آلبوم: {track.album}</span>
                <span>•</span>
                <span data-testid={`text-track-duration-${track.id}`}>{track.duration}</span>
                {track.releaseYear && (
                  <>
                    <span>•</span>
                    <span data-testid={`text-track-year-${track.id}`}>{track.releaseYear}</span>
                  </>
                )}
              </div>

              <div>
                <Badge variant="secondary" className="gap-1">
                  اسپاتیفای
                </Badge>
              </div>
            </div>

            {children && (
              <div className="mt-6">
                {children}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
