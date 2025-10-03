import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Library() {
  return (
    <div className="min-h-screen">
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">کتابخانه من</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">کتابخانه شما خالی است</h2>
            <p className="text-muted-foreground">
              آهنگ‌های دانلود شده شما در اینجا نمایش داده خواهند شد
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
