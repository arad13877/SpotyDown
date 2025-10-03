import SearchBar from "./SearchBar";
import { SiSpotify } from "react-icons/si";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
            آهنگ‌های مورد علاقه‌تان را با بهترین کیفیت دانلود کنید
          </p>

          <div className="pt-4">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground pt-4">
            <span className="flex items-center gap-1">
              ✓ کیفیت بالا
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ✓ دانلود رایگان
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              ✓ بدون محدودیت
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
