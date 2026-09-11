import { DownloadButton } from "@/components/ui/DownloadButton";

export function Footer() {
  return (
    <footer className="border-t border-void-border bg-void-elevated/40">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-ink-hud">
          Get Planova on your Android device
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-glow-amber">
          Direct APK download · No store required
        </p>
        <div className="mt-6 flex justify-center">
          <DownloadButton />
        </div>
        <div className="mt-12 flex flex-col items-center gap-2 text-sm text-sub-hud">
          <p>© {new Date().getFullYear()} Planova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
