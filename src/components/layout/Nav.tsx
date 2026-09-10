import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DownloadButton } from "@/components/ui/DownloadButton";

const links = [
  { href: "#features", label: "Features" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#how-it-works", label: "How it works" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="#" className="flex items-center">
          <Image
            src="/logo/planova_logo.png"
            alt="Planova"
            width={1254}
            height={1254}
            priority
            className="h-11 w-11"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-sub hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <DownloadButton className="hidden !px-4 !py-2 text-sm sm:inline-flex" />
        </div>
      </div>
    </header>
  );
}
