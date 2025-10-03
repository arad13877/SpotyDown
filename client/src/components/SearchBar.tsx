import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  variant?: "hero" | "compact";
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "نام آهنگ، هنرمند یا آلبوم را جستجو کنید...",
  variant = "hero"
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
      console.log('جستجو برای:', query);
    }
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pr-10 h-12"
            data-testid="input-search-compact"
          />
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 sm:w-6 sm:h-6" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pr-12 sm:pr-14 h-14 sm:h-16 text-base sm:text-lg"
            data-testid="input-search-hero"
          />
        </div>
        <Button 
          type="submit"
          size="lg"
          className="h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold"
          data-testid="button-search"
        >
          جستجو
        </Button>
      </div>
    </form>
  );
}
