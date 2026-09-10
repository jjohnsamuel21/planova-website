import { APK_PATH } from "@/lib/content/download";

export function DownloadButton({
  className = "",
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "onGradient";
}) {
  const styles =
    variant === "onGradient"
      ? "bg-white text-accent hover:opacity-90"
      : "bg-accent text-accent-ink hover:opacity-90";

  return (
    <a
      href={APK_PATH}
      download
      className={`inline-flex items-center gap-2 rounded-chip px-5 py-3 font-semibold transition-opacity ${styles} ${className}`}
    >
      <span aria-hidden>⬇</span> Download APK
    </a>
  );
}
