import { Search, Home, Library, Info } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <a className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-all" data-testid="link-home">
              <SiSpotify className="text-primary w-8 h-8" />
              <span className="font-bold text-lg hidden sm:inline">دانلود اسپاتیفای</span>
            </a>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button 
                variant={location === "/" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
                data-testid="button-nav-home"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">خانه</span>
              </Button>
            </Link>
            
            <Link href="/search">
              <Button 
                variant={location === "/search" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
                data-testid="button-nav-search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">جستجو</span>
              </Button>
            </Link>
            
            <Link href="/library">
              <Button 
                variant={location === "/library" ? "secondary" : "ghost"} 
                size="sm"
                className="gap-2"
                data-testid="button-nav-library"
              >
                <Library className="w-4 h-4" />
                <span className="hidden sm:inline">کتابخانه</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
