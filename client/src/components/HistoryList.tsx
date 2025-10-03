import { type TrackInfo } from "./TrackPreview";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryListProps {
  tracks: TrackInfo[];
  onDownload?: (track: TrackInfo) => void;
}

export default function HistoryList({ tracks, onDownload }: HistoryListProps) {
  if (tracks.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold">آهنگ‌های اخیر</h3>
      </div>

      <div className="space-y-3">
        {tracks.map((track) => (
          <Card key={track.id} className="hover-elevate" data-testid={`history-item-${track.id}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img 
                    src={track.coverUrl} 
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate" data-testid={`text-history-title-${track.id}`}>
                    {track.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate" data-testid={`text-history-artist-${track.id}`}>
                    {track.artist}
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => onDownload?.(track)}
                  className="gap-1 flex-shrink-0"
                  data-testid={`button-history-download-${track.id}`}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">دانلود</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
