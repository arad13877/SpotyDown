import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export type QualityOption = "320" | "256" | "128";

interface DownloadButtonProps {
  onDownload: (quality: QualityOption) => void;
  disabled?: boolean;
  isDownloading?: boolean;
}

export default function DownloadButton({ 
  onDownload, 
  disabled = false,
  isDownloading = false 
}: DownloadButtonProps) {
  const [selectedQuality, setSelectedQuality] = useState<QualityOption>("320");

  const handleDownload = (quality: QualityOption) => {
    setSelectedQuality(quality);
    onDownload(quality);
    console.log(`دانلود با کیفیت ${quality}kbps`);
  };

  const qualities: { value: QualityOption; label: string; description: string }[] = [
    { value: "320", label: "320 kbps", description: "بهترین کیفیت" },
    { value: "256", label: "256 kbps", description: "کیفیت بالا" },
    { value: "128", label: "128 kbps", description: "کیفیت متوسط" },
  ];

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleDownload(selectedQuality)}
        disabled={disabled || isDownloading}
        className="flex-1 gap-2"
        size="lg"
        data-testid="button-download-track"
      >
        {isDownloading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            در حال دانلود...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            دانلود ({selectedQuality} kbps)
          </>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            disabled={disabled || isDownloading}
            className="px-3"
            data-testid="button-quality-menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {qualities.map((quality) => (
            <DropdownMenuItem
              key={quality.value}
              onClick={() => handleDownload(quality.value)}
              className="flex items-center justify-between"
              data-testid={`menu-item-quality-${quality.value}`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{quality.label}</span>
                <span className="text-xs text-muted-foreground">{quality.description}</span>
              </div>
              {selectedQuality === quality.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
