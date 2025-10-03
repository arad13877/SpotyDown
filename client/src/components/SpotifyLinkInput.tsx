import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiSpotify } from "react-icons/si";
import { AlertCircle, Link as LinkIcon } from "lucide-react";

interface SpotifyLinkInputProps {
  onSubmit: (url: string, trackId: string) => void;
  isLoading?: boolean;
}

export default function SpotifyLinkInput({ onSubmit, isLoading = false }: SpotifyLinkInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const extractTrackId = (spotifyUrl: string): string | null => {
    const patterns = [
      /spotify\.com\/track\/([a-zA-Z0-9]+)/,
      /spotify:track:([a-zA-Z0-9]+)/,
    ];

    for (const pattern of patterns) {
      const match = spotifyUrl.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("لطفاً لینک آهنگ را وارد کنید");
      return;
    }

    const trackId = extractTrackId(url);
    if (!trackId) {
      setError("لینک وارد شده معتبر نیست. لطفاً لینک آهنگ اسپاتیفای را وارد کنید");
      return;
    }

    onSubmit(url, trackId);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setError("");
    } catch (err) {
      console.log('خطا در خواندن کلیپ‌بورد');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="space-y-3">
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <SiSpotify className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 sm:w-6 sm:h-6" />
            <Input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="لینک آهنگ اسپاتیفای را اینجا وارد کنید..."
              className="pr-12 sm:pr-14 h-14 sm:h-16 text-base sm:text-lg"
              disabled={isLoading}
              data-testid="input-spotify-link"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handlePaste}
            className="h-14 sm:h-16 px-4 sm:px-6"
            disabled={isLoading}
            data-testid="button-paste"
          >
            <LinkIcon className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            size="lg"
            className="h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold"
            disabled={isLoading}
            data-testid="button-fetch"
          >
            {isLoading ? "در حال بارگذاری..." : "دریافت"}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-2 rounded-md" data-testid="error-message">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          مثال: https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp
        </p>
      </div>
    </form>
  );
}
