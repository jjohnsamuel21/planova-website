import Image from "next/image";
import Link from "next/link";
import { DownloadButton } from "@/components/ui/DownloadButton";

const links = [
  { href: "#plans", label: "Plans" },
  { href: "#thread-dial", label: "Thread & Dial" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#family", label: "Family" },
];

export function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-void-border/60 bg-void/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/logo/planova_logo.png"
            alt="Planova"
            width={1254}
            height={1254}
            priority
            className="h-9 w-9"
          />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sub-hud">
            Planova
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-sub-hud transition-colors hover:text-ink-hud"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <DownloadButton className="!px-4 !py-2 text-sm" />
      </div>
    </header>
  );
}
