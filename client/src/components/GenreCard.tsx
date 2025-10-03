import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";

export interface Genre {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

interface GenreCardProps {
  genre: Genre;
  onClick?: (genre: Genre) => void;
}

export default function GenreCard({ genre, onClick }: GenreCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(genre);
    }
    console.log('ژانر انتخاب شده:', genre.name);
  };

  return (
    <Card 
      className="group cursor-pointer hover-elevate active-elevate-2 overflow-hidden transition-all"
      onClick={handleClick}
      data-testid={`card-genre-${genre.id}`}
    >
      <CardContent className="p-6">
        <div 
          className="relative aspect-square rounded-md flex items-center justify-center mb-3 bg-gradient-to-br from-primary/20 to-primary/5"
        >
          <Music className="w-12 h-12 text-primary" />
        </div>
        <h3 className="font-bold text-center" data-testid={`text-genre-${genre.id}`}>
          {genre.name}
        </h3>
      </CardContent>
    </Card>
  );
}
