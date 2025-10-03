import { SiSpotify, SiInstagram, SiTelegram, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <SiSpotify className="text-primary w-8 h-8" />
              <span className="font-bold text-lg">دانلود اسپاتیفای</span>
            </div>
            <p className="text-sm text-muted-foreground">
              بهترین سرویس برای دانلود آهنگ‌های اسپاتیفای با کیفیت بالا
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">لینک‌های مفید</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">
                    صفحه اصلی
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <a className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-search">
                    جستجو
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  قوانین استفاده
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="ghost"
                className="hover-elevate"
                data-testid="button-social-instagram"
                onClick={() => console.log('اینستاگرام')}
              >
                <SiInstagram className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="hover-elevate"
                data-testid="button-social-telegram"
                onClick={() => console.log('تلگرام')}
              >
                <SiTelegram className="w-5 h-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost"
                className="hover-elevate"
                data-testid="button-social-twitter"
                onClick={() => console.log('توییتر')}
              >
                <SiX className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} دانلود اسپاتیفای. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
