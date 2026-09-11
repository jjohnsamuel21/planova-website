import type { Metadata } from "next";
import { Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Planova — Family routines, engineered.",
  description:
    "Planova is a collaborative family routine tracker: create plans, log daily tasks together, and see everyone's progress on a live dashboard.",
  icons: {
    icon: "/logo/planova_logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
