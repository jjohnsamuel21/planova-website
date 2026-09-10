import { DownloadButton } from "@/components/ui/DownloadButton";
import { Badge } from "@/components/ui/Badge";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt/40">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-ink">
          Get Planova on your Android device
        </h2>
        <div className="mt-3 flex justify-center">
          <Badge>🌸 Direct APK download</Badge>
        </div>
        <div className="mt-6 flex justify-center">
          <DownloadButton />
        </div>
        <div className="mt-12 flex flex-col items-center gap-2 text-sm text-sub">
          <p>© {new Date().getFullYear()} Planova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
