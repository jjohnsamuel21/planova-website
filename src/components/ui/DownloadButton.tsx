import { APK_PATH } from "@/lib/content/download";

export function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={APK_PATH}
      download
      className={`inline-flex items-center gap-2 rounded-chip bg-glow-amber px-5 py-3 font-bold text-void transition-transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(232,163,61,0.45)] ${className}`}
    >
      <span aria-hidden>⬇</span> Download APK
    </a>
  );
}
