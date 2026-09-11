# Planova Futuristic Marketing Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current flat template marketing site with a single-scroll, dark-HUD, "futuristic" experience built from 8 chapters, each showing a live-rebuilt interactive recreation of the real Planova app UI, so a visit itself makes people want to download the app.

**Architecture:** Next.js App Router, single page (`src/app/page.tsx`) composed of 8 full-viewport chapter components under `src/components/chapters/`, each independently scroll-animated via Framer Motion and built on a small set of shared UI primitives (`Reveal`, `PhoneFrame`, `DonutRing`, `CountUp`, `ParticleField`, `ChatBubble`, `DialRow`) under `src/components/ui/`. The existing Thread/Dial CSS-variable theming system (`.thread` / `.dial` classes, `globals.css`) is kept exactly as-is and reused *locally* inside the Thread↔Dial chapter; a new, separate "void/glow" token set is added for the site's own dark-HUD chrome. The old site-wide light/dark `ThemeProvider`/`ThemeToggle` is removed — this site is dark-HUD only.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4 (CSS-first `@theme inline` config, no `tailwind.config.js`), Framer Motion (new dependency), TypeScript.

**Spec:** `docs/superpowers/specs/2026-09-11-futuristic-rebuild-design.md`

## Global Constraints

- Void background `#0A0E1A`; primary accent is Dial's amber `#E8A33D`; secondary accent is Thread's purple `#7A6AB0` — no other accent colors (no generic sci-fi cyan/teal as a primary color).
- Typography unchanged: Nunito for UI/headlines, JetBrains Mono for all numerals/stats/timestamps.
- No site-wide light/dark toggle. Thread's light palette appears only inside the Thread↔Dial chapter's demo panel.
- No 3D/WebGL dependency (no Three.js / React Three Fiber). The ambient background is a hand-rolled 2D `<canvas>` only.
- Framer Motion is the only animation engine — no GSAP, no native CSS `animation-timeline`.
- `prefers-reduced-motion: reduce` must collapse scroll choreography to simple opacity fades and disable the canvas background.
- All 8 primary chapters show live-rebuilt interactive recreations of the app UI — no embedded screenshots.
- Mobile-width (≈390px) layouts must be a sane stacked layout, not a squeezed desktop layout — this is an Android app's marketing site.

---

## Task 1: Install Framer Motion

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm, not hand-edited)

**Interfaces:**
- Produces: the `framer-motion` package available to all later tasks via `import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion"`.

- [ ] **Step 1: Install the dependency**

Run: `npm install framer-motion`

- [ ] **Step 2: Verify the build still succeeds**

Run: `npm run build`
Expected: build completes successfully (no new errors introduced; this is the pre-change baseline check).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion dependency"
```

---

## Task 2: Add void/glow design tokens

**Files:**
- Modify: `src/app/globals.css` (full-file replace)
- Modify: `src/lib/theme/tokens.ts`

**Interfaces:**
- Produces: Tailwind utility classes `bg-void`, `bg-void-elevated`, `border-void-border`, `text-glow-amber`, `bg-glow-amber`, `text-glow-purple`, `bg-glow-purple`, `text-ink-hud`, `text-sub-hud`, `text-faint-hud` (and `bg-`/`border-` variants of each color token, per Tailwind's normal behavior), available everywhere from Task 3 onward. Also produces a `hudColors` export from `src/lib/theme/tokens.ts` mirroring the same hex values for use in raw TS/SVG contexts (e.g. inline `stroke` colors) where a Tailwind class won't work.
- Consumes: nothing new — this task only adds tokens alongside the existing `--color-background`/`--color-ink`/etc. (Thread/Dial scoped tokens), which are left completely unchanged since the Thread↔Dial chapter (Task 8) still depends on them.

- [ ] **Step 1: Replace the entire contents of `src/app/globals.css`**

```css
@import "tailwindcss";

:root,
.thread {
  --color-background: #f6f3fc;
  --color-surface: #ffffff;
  --color-surface-alt: #efeafc;
  --color-border: #e7e1f5;
  --color-ink: #2b2740;
  --color-sub: #8a83a6;
  --color-faint: #b7b0d6;
  --color-accent: #7a6ab0;
  --color-accent-ink: #ffffff;
  --color-pill-bg: #efeafc;
  --color-pill-text: #6a5bb0;
  --color-danger: #a4453f;
  --color-danger-bg: #fceeee;
  --color-success: #5c9a7a;
  --color-success-bg: #eaf6ef;
  --color-warning: #c4874a;
  --color-warning-bg: #fdf1e4;
  --shadow-card: 0 2px 10px rgba(43, 39, 64, 0.08);
}

.dial {
  --color-background: #0c1220;
  --color-surface: #121a2e;
  --color-surface-alt: #161f38;
  --color-surface-alt-2: #182240;
  --color-border: #26315a;
  --color-ink: #e9edf7;
  --color-sub: #8792a6;
  --color-faint: #5c6885;
  --color-accent: #e8a33d;
  --color-accent-ink: #121a2e;
  --color-pill-bg: #1e2a4d;
  --color-pill-text: #a8b3cc;
  --color-danger: #a4453f;
  --color-danger-bg: #fceeee;
  --color-success: #5c9a7a;
  --color-success-bg: #eaf6ef;
  --color-warning: #c4874a;
  --color-warning-bg: #fdf1e4;
  --shadow-card: 0 6px 18px rgba(0, 0, 0, 0.35);
}

:root {
  --color-void: #0a0e1a;
  --color-void-elevated: #10162a;
  --color-void-border: #1e2740;
  --color-glow-amber: #e8a33d;
  --color-glow-amber-soft: rgba(232, 163, 61, 0.35);
  --color-glow-purple: #7a6ab0;
  --color-glow-purple-soft: rgba(122, 106, 176, 0.35);
  --color-ink-hud: #e9edf7;
  --color-sub-hud: #8792a6;
  --color-faint-hud: #4b5670;
}

@theme inline {
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-surface-alt: var(--color-surface-alt);
  --color-border: var(--color-border);
  --color-ink: var(--color-ink);
  --color-sub: var(--color-sub);
  --color-faint: var(--color-faint);
  --color-accent: var(--color-accent);
  --color-accent-ink: var(--color-accent-ink);
  --color-pill-bg: var(--color-pill-bg);
  --color-pill-text: var(--color-pill-text);
  --color-danger: var(--color-danger);
  --color-danger-bg: var(--color-danger-bg);
  --color-success: var(--color-success);
  --color-success-bg: var(--color-success-bg);
  --color-warning: var(--color-warning);
  --color-warning-bg: var(--color-warning-bg);

  --color-category-purple: #7a6ab0;
  --color-category-green: #5c9a7a;
  --color-category-orange: #c4874a;
  --color-category-blue: #4f8fe0;
  --color-category-red: #a4453f;
  --color-category-teal: #3fa6a6;
  --color-category-pink: #c48fd6;

  --color-void: var(--color-void);
  --color-void-elevated: var(--color-void-elevated);
  --color-void-border: var(--color-void-border);
  --color-glow-amber: var(--color-glow-amber);
  --color-glow-amber-soft: var(--color-glow-amber-soft);
  --color-glow-purple: var(--color-glow-purple);
  --color-glow-purple-soft: var(--color-glow-purple-soft);
  --color-ink-hud: var(--color-ink-hud);
  --color-sub-hud: var(--color-sub-hud);
  --color-faint-hud: var(--color-faint-hud);

  --shadow-card: var(--shadow-card);

  --radius-chip: 10px;
  --radius-card: 16px;
  --radius-card-sm: 14px;
  --radius-card-lg: 20px;
  --radius-sheet: 24px;

  --font-sans: var(--font-nunito);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background: var(--color-void);
  color: var(--color-ink-hud);
}
```

- [ ] **Step 2: Replace the entire contents of `src/lib/theme/tokens.ts`**

```ts
// Mirrors the CSS custom properties defined in src/app/globals.css.
// Keep byte-identical to globals.css when either changes.

export const threadColors = {
  background: "#F6F3FC",
  surface: "#FFFFFF",
  surfaceAlt: "#EFEAFC",
  border: "#E7E1F5",
  ink: "#2B2740",
  sub: "#8A83A6",
  faint: "#B7B0D6",
  accent: "#7A6AB0",
  accentInk: "#FFFFFF",
  pillBg: "#EFEAFC",
  pillText: "#6A5BB0",
  danger: "#A4453F",
  dangerBg: "#FCEEEE",
  success: "#5C9A7A",
  successBg: "#EAF6EF",
  warning: "#C4874A",
  warningBg: "#FDF1E4",
} as const;

export const dialColors = {
  background: "#0C1220",
  surface: "#121A2E",
  surfaceAlt: "#161F38",
  surfaceAlt2: "#182240",
  border: "#26315A",
  ink: "#E9EDF7",
  sub: "#8792A6",
  faint: "#5C6885",
  accent: "#E8A33D",
  accentInk: "#121A2E",
  pillBg: "#1E2A4D",
  pillText: "#A8B3CC",
  danger: "#A4453F",
  dangerBg: "#FCEEEE",
  success: "#5C9A7A",
  successBg: "#EAF6EF",
  warning: "#C4874A",
  warningBg: "#FDF1E4",
} as const;

export const categoryColors = {
  purple: "#7A6AB0",
  green: "#5C9A7A",
  orange: "#C4874A",
  blue: "#4F8FE0",
  red: "#A4453F",
  teal: "#3FA6A6",
  pink: "#C48FD6",
} as const;

export type CategoryColor = keyof typeof categoryColors;

export const hudColors = {
  void: "#0A0E1A",
  voidElevated: "#10162A",
  voidBorder: "#1E2740",
  glowAmber: "#E8A33D",
  glowAmberSoft: "rgba(232, 163, 61, 0.35)",
  glowPurple: "#7A6AB0",
  glowPurpleSoft: "rgba(122, 106, 176, 0.35)",
  inkHud: "#E9EDF7",
  subHud: "#8792A6",
  faintHud: "#4B5670",
} as const;
```

Note: this removes the old `heroGradient` export (unused after Task 3 rewrites `Hero`).

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed. (Existing components still reference `bg-background`/`text-ink`/etc., which are untouched, so nothing should break yet.)

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/lib/theme/tokens.ts
git commit -m "feat: add void/glow design tokens for the dark HUD marketing chrome"
```

---

## Task 3: Rewrite site chrome (Nav, Footer, DownloadButton, Badge) and remove the theme toggle system

**Files:**
- Modify: `src/components/layout/Nav.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/DownloadButton.tsx`
- Modify: `src/components/ui/Badge.tsx`
- Modify: `src/app/layout.tsx`
- Delete: `src/components/theme/ThemeProvider.tsx`
- Delete: `src/components/theme/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `APK_PATH` from `src/lib/content/download.ts` (unchanged).
- Produces: `DownloadButton({ className? })` — **note the `variant` prop is removed** (the old `"solid" | "onGradient"` distinction no longer applies; every later task that renders `<DownloadButton />` must not pass `variant`). `Badge({ children })` unchanged signature, restyled. `Nav()` and `Footer()` take no props.

- [ ] **Step 1: Delete the theme system files**

Delete `src/components/theme/ThemeProvider.tsx` and `src/components/theme/ThemeToggle.tsx`.

- [ ] **Step 2: Replace `src/app/layout.tsx`**

```tsx
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
```

- [ ] **Step 3: Replace `src/components/ui/DownloadButton.tsx`**

```tsx
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
```

- [ ] **Step 4: Replace `src/components/ui/Badge.tsx`**

```tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-chip border border-void-border bg-void-elevated/80 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.15em] text-glow-amber">
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Replace `src/components/layout/Nav.tsx`**

```tsx
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
```

- [ ] **Step 6: Replace `src/components/layout/Footer.tsx`**

```tsx
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
```

- [ ] **Step 7: Fix `src/app/page.tsx` so the build compiles**

The page still imports the old sections which are unaffected by this task, but `Hero.tsx` (old) passes `variant="onGradient"` to `DownloadButton`, which no longer accepts that prop. Open `src/components/sections/Hero.tsx` and remove the `variant="onGradient"` prop from its `<DownloadButton ... />` call (leave everything else in that file as-is — it gets deleted wholesale in Task 6).

- [ ] **Step 8: Verify build, lint, and visually check the chrome**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, open `http://localhost:3000`, confirm: a fixed dark translucent nav bar with the Planova logo, nav links, and an amber "Download APK" button is visible at the top, and a dark footer with the same button is visible at the bottom. (The middle of the page will still look like the old site — that's expected, it's replaced in later tasks.)

- [ ] **Step 9: Commit**

```bash
git add src/app/layout.tsx src/components/layout/Nav.tsx src/components/layout/Footer.tsx src/components/ui/DownloadButton.tsx src/components/ui/Badge.tsx src/components/sections/Hero.tsx
git rm src/components/theme/ThemeProvider.tsx src/components/theme/ThemeToggle.tsx
git commit -m "feat: rewrite site chrome for dark HUD theme, remove site-wide theme toggle"
```

---

## Task 4: Build shared layout primitives — Reveal, PhoneFrame, DonutRing

**Files:**
- Create: `src/components/ui/Reveal.tsx`
- Create: `src/components/ui/PhoneFrame.tsx`
- Create: `src/components/ui/DonutRing.tsx`

**Interfaces:**
- Produces:
  - `Reveal({ children, delay?, className? })` — a `motion.div` that fades/rises in once on scroll entry. `delay` in seconds, default `0`.
  - `PhoneFrame({ children, className? })` — a device-chrome wrapper `div`.
  - `DonutRing({ segments, size?, strokeWidth?, centerValue?, centerLabel?, trackColor? })` where `segments: { label: string; value: number; color: string }[]`. `size` default `176`, `strokeWidth` default `16`.
- Consumes: nothing (pure presentational primitives, no dependency on Task 5's primitives).

- [ ] **Step 1: Create `src/components/ui/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/PhoneFrame.tsx`**

```tsx
import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[300px] rounded-[2.5rem] border-4 border-void-border bg-void-elevated p-2 shadow-[0_0_60px_rgba(232,163,61,0.15)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-void" />
      <div className="min-h-[560px] overflow-hidden rounded-[2rem] bg-[#0C1220] p-4">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/DonutRing.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

export function DonutRing({
  segments,
  size = 176,
  strokeWidth = 16,
  centerValue,
  centerLabel,
  trackColor = "#26315A",
}: {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerValue?: string;
  centerLabel?: string;
  trackColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  let cumulative = 0;
  const arcs = segments.map((segment) => {
    const fraction = segment.value / total;
    const offset = cumulative;
    cumulative += fraction;
    return { ...segment, fraction, offset };
  });

  return (
    <div
      className="grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="col-start-1 row-start-1"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          opacity={0.35}
        />
        {arcs.map((arc, index) => (
          <motion.circle
            key={arc.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ pathOffset: arc.offset }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: arc.fraction }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
          />
        ))}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="col-start-1 row-start-1 flex flex-col items-center">
          {centerValue && (
            <span className="font-mono text-3xl font-extrabold text-ink-hud">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-sub-hud">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
```

**Fallback if the segments render wrong** (visible in Task 6's visual check as gaps, overlapping arcs, or arcs in the wrong order — this is the one genuinely novel technique in this plan): replace the `<motion.circle>` block's `style`/`initial`/`whileInView` with manual circumference math instead of `pathLength`/`pathOffset`:

```tsx
{arcs.map((arc, index) => {
  const circumference = 2 * Math.PI * radius;
  const arcLength = arc.fraction * circumference;
  const startOffset = arc.offset * circumference;
  return (
    <motion.circle
      key={arc.label}
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke={arc.color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      transform={`rotate(-90 ${size / 2} ${size / 2})`}
      strokeDasharray={`${arcLength} ${circumference - arcLength}`}
      initial={{ strokeDashoffset: -startOffset + arcLength }}
      whileInView={{ strokeDashoffset: -startOffset }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
    />
  );
})}
```

- [ ] **Step 4: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed (these files aren't imported anywhere yet, but Next's build type-checks the whole project).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Reveal.tsx src/components/ui/PhoneFrame.tsx src/components/ui/DonutRing.tsx
git commit -m "feat: add Reveal, PhoneFrame, and DonutRing shared UI primitives"
```

---

## Task 5: Build shared data/motion primitives — CountUp, ParticleField, ChatBubble, DialRow

**Files:**
- Create: `src/components/ui/CountUp.tsx`
- Create: `src/components/ui/ParticleField.tsx`
- Create: `src/components/ui/ChatBubble.tsx`
- Create: `src/components/ui/DialRow.tsx`

**Interfaces:**
- Produces:
  - `CountUp({ value, suffix?, decimals?, className? })` — renders an animated mono-numeral counter that ticks up to `value` once it scrolls into view.
  - `ParticleField({ className? })` — a full-bleed absolutely-positioned `<canvas>` ambient background; caller must position it inside a `relative` parent.
  - `ChatBubble({ title, meta?, delay? })` — a Thread-style chat bubble. **Must be rendered inside an ancestor with the `thread` class** (it uses the scoped `bg-surface`/`text-ink`/`text-sub`/`shadow-card` tokens from `globals.css`, not the void/glow tokens).
  - `DialRow({ title, due?, progress, delay? })` — a Dial-style task row (`progress` is 0–100). **Must be rendered inside an ancestor with the `dial` class** (same scoped-token dependency as `ChatBubble`).
- Consumes: nothing from Task 4.

- [ ] **Step 1: Create `src/components/ui/CountUp.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/ParticleField.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

export function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;

    function resize() {
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * window.devicePixelRatio;
      canvas!.height = height * window.devicePixelRatio;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function seed() {
      const count = Math.floor((width * height) / 22000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.4,
      }));
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "rgba(232, 163, 61, 0.4)";
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawAnimated() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = "rgba(232, 163, 61, 0.55)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      frame = requestAnimationFrame(drawAnimated);
    }

    resize();
    seed();

    if (reduceMotion) {
      drawStatic();
    } else {
      drawAnimated();
    }

    const handleResize = () => {
      resize();
      seed();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
```

- [ ] **Step 3: Create `src/components/ui/ChatBubble.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export function ChatBubble({
  title,
  meta,
  delay = 0,
}: {
  title: string;
  meta?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="max-w-[85%] rounded-card rounded-bl-md bg-surface px-4 py-3 text-sm font-semibold text-ink shadow-card"
    >
      {title}
      {meta && (
        <div className="mt-1 text-xs font-normal text-sub">{meta}</div>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/DialRow.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export function DialRow({
  title,
  due,
  progress,
  delay = 0,
}: {
  title: string;
  due?: string;
  progress: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between gap-3 rounded-card-sm border border-border bg-surface-alt px-4 py-3"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-ink">{title}</span>
          {due && (
            <span className="rounded-chip bg-warning-bg px-2 py-0.5 font-mono text-[10px] font-bold text-warning">
              Due {due}
            </span>
          )}
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </div>
      <span className="font-mono text-xs font-bold text-sub">
        {progress}%
      </span>
    </motion.div>
  );
}
```

- [ ] **Step 5: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/CountUp.tsx src/components/ui/ParticleField.tsx src/components/ui/ChatBubble.tsx src/components/ui/DialRow.tsx
git commit -m "feat: add CountUp, ParticleField, ChatBubble, and DialRow shared UI primitives"
```

---

## Task 6: Build the Hero chapter

**Files:**
- Create: `src/components/chapters/Hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `PhoneFrame`, `DonutRing` (Task 4); `CountUp`, `ParticleField` (Task 5); `Badge`, `DownloadButton` (Task 3).
- Produces: `Hero()` — a `<section id="hero">`, no props. This is the first chapter rendered in `src/app/page.tsx`.

- [ ] **Step 1: Create `src/components/chapters/Hero.tsx`**

```tsx
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Badge } from "@/components/ui/Badge";
import { ParticleField } from "@/components/ui/ParticleField";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { DonutRing } from "@/components/ui/DonutRing";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const heroSegments = [
  { label: "Medicine", value: 7, color: "#7A6AB0" },
  { label: "Exercise", value: 2, color: "#3FA6A6" },
  { label: "Food", value: 6, color: "#A4453F" },
  { label: "Sleep", value: 1, color: "#5C9A7A" },
  { label: "Baby", value: 6, color: "#C4874A" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-void-border pt-16"
    >
      <ParticleField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,163,61,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(122,106,176,0.12),transparent_45%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <Reveal>
            <Badge>🌸 Android · direct APK download</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink-hud md:text-6xl">
              Family routines, <span className="text-glow-amber">engineered</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-lg text-sub-hud">
              Plans, logs, reminders, and a live dashboard for everything
              your family tracks together — medication, chores, recovery,
              baby care, anything. One system, built to actually get used.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton />
              <a
                href="#thread-dial"
                className="text-sm font-semibold text-sub-hud underline decoration-void-border underline-offset-4 hover:text-ink-hud"
              >
                See it in action ↓
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center md:justify-end">
          <PhoneFrame>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-sub-hud">
                Today
              </span>
              <span className="font-mono text-sm font-bold text-glow-amber">
                <CountUp value={58} suffix="%" />
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <DonutRing
                segments={heroSegments}
                size={168}
                strokeWidth={14}
                centerValue="58%"
                centerLabel="TODAY"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-chip bg-void-border/40 px-3 py-2">
                <div className="font-mono text-lg font-bold text-glow-amber">
                  <CountUp value={12} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-sub-hud">
                  Day streak
                </div>
              </div>
              <div className="rounded-chip bg-void-border/40 px-3 py-2">
                <div className="font-mono text-lg font-bold text-glow-amber">
                  <CountUp value={83} suffix="%" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-sub-hud">
                  7-day avg
                </div>
              </div>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `src/app/page.tsx`**

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
```

(This drops the old `Features`/`UseCases`/`HowItWorks` sections from the page. Their files remain on disk unused until Task 14's cleanup — that's expected and harmless.)

- [ ] **Step 3: Verify build, lint, and visually check the Hero chapter**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, open `http://localhost:3000`. Confirm: a full-viewport dark hero with a faint moving particle field, the headline "Family routines, engineered." with "engineered" in amber, a phone mockup on the right showing a segmented donut ring that draws in on load with distinct colored arcs (no gaps/overlaps — if it looks wrong, apply Task 4's fallback), and two KPI tiles whose numbers count up from 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/chapters/Hero.tsx src/app/page.tsx
git commit -m "feat: build the Hero chapter"
```

---

## Task 7: Build the Plans chapter

**Files:**
- Create: `src/lib/content/plans.ts`
- Create: `src/components/chapters/Plans.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4).
- Produces: `plans: PlanCard[]` from `src/lib/content/plans.ts`, where `PlanCard = { id: string; emoji: string; title: string; frequency: string; taskCount: number }`. `Plans()` — a `<section id="plans">`, no props.

- [ ] **Step 1: Create `src/lib/content/plans.ts`**

```ts
export type PlanCard = {
  id: string;
  emoji: string;
  title: string;
  frequency: string;
  taskCount: number;
};

export const plans: PlanCard[] = [
  { id: "postpartum", emoji: "🌸", title: "Postpartum Recovery", frequency: "Daily", taskCount: 6 },
  { id: "chores", emoji: "🏡", title: "Family Chores", frequency: "Weekly", taskCount: 8 },
  { id: "meds", emoji: "💊", title: "Medication Schedule", frequency: "Daily", taskCount: 4 },
  { id: "baby", emoji: "👶", title: "Baby Care", frequency: "Daily", taskCount: 10 },
  { id: "recovery", emoji: "💪", title: "Injury Recovery", frequency: "Every 2 days", taskCount: 5 },
  { id: "onboarding", emoji: "🔑", title: "New Roommate Setup", frequency: "Only once", taskCount: 7 },
];
```

- [ ] **Step 2: Create `src/components/chapters/Plans.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { plans } from "@/lib/content/plans";

export function Plans() {
  return (
    <section id="plans" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            01 · Plans
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            One system for every routine your family runs.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Medicine, chores, recovery, baby care — create a plan for
            anything, choose how often it repeats, and let it adapt on its
            own every day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-card-lg border border-void-border bg-void-elevated p-6 transition-colors hover:border-glow-amber/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-card-sm bg-void/60 text-2xl">
                {plan.emoji}
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-ink-hud">
                {plan.title}
              </h3>
              <p className="mt-2 font-mono text-xs font-semibold uppercase tracking-wider text-sub-hud">
                {plan.frequency} · {plan.taskCount} tasks
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `Plans` to `src/app/page.tsx`**

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";
import { Plans } from "@/components/chapters/Plans";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Plans />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll past the Hero. Confirm: 6 plan cards assemble with a staggered fade-up as they enter the viewport.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/plans.ts src/components/chapters/Plans.tsx src/app/page.tsx
git commit -m "feat: build the Plans chapter"
```

---

## Task 8: Build the Thread ↔ Dial chapter

**Files:**
- Create: `src/components/chapters/ThreadDial.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `PhoneFrame` (Task 4); `ChatBubble`, `DialRow` (Task 5).
- Produces: `ThreadDial()` — a `<section id="thread-dial">`, no props.

- [ ] **Step 1: Create `src/components/chapters/ThreadDial.tsx`**

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { DialRow } from "@/components/ui/DialRow";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

const tasks = [
  { id: "iron", title: "Morning — Iron Syrup, 1 cap", due: undefined as string | undefined, progress: 100 },
  { id: "calcium", title: "Afternoon — Calcium, 1 tab", due: "1:00 PM", progress: 100 },
  { id: "night", title: "Night — Iron Syrup, 1 cap", due: "9:00 PM", progress: 0 },
  { id: "ointment", title: "Ointment (if needed)", due: undefined as string | undefined, progress: 40 },
];

export function ThreadDial() {
  const [mode, setMode] = useState<"thread" | "dial">("thread");

  return (
    <section id="thread-dial" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            02 · Thread &amp; Dial
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Two ways to log. Same routine.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Thread is a calm, chat-style feed for logging as you go. Dial is
            a dense, dark control panel with a live progress ring. Switch
            anytime — it&apos;s the same data, just how it feels to use it.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <div className="inline-flex items-center rounded-chip border border-void-border bg-void-elevated p-1">
            {(["thread", "dial"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                aria-pressed={mode === option}
                className={`rounded-chip px-5 py-2 text-sm font-bold capitalize transition-colors ${
                  mode === option
                    ? "bg-glow-amber text-void"
                    : "text-sub-hud hover:text-ink-hud"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <PhoneFrame className="!min-h-0">
            <AnimatePresence mode="wait">
              {mode === "thread" ? (
                <motion.div
                  key="thread"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="thread min-h-[520px] rounded-2xl bg-background p-4"
                >
                  <p className="text-sm font-extrabold text-ink">Medicine</p>
                  <div className="mt-4 space-y-3">
                    {tasks.map((task, index) => (
                      <ChatBubble
                        key={task.id}
                        title={task.title}
                        meta={task.due ? `Due ${task.due}` : "Sitz bath — 2/3 times"}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="dial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="dial min-h-[520px] rounded-2xl bg-background p-4"
                >
                  <p className="text-sm font-extrabold text-ink">Medicine</p>
                  <div className="mt-4 space-y-3">
                    {tasks.map((task, index) => (
                      <DialRow
                        key={task.id}
                        title={task.title}
                        due={task.due}
                        progress={task.progress}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `ThreadDial` to `src/app/page.tsx`** (insert after `<Plans />`)

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";
import { Plans } from "@/components/chapters/Plans";
import { ThreadDial } from "@/components/chapters/ThreadDial";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Plans />
        <ThreadDial />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the Thread & Dial chapter. Confirm: a Thread/Dial toggle above a phone mockup; "Thread" shows a light lavender chat-bubble list; clicking "Dial" crossfades to a dark navy panel with amber progress bars and a "Due" badge. This is the one place on the page the light Thread palette should appear.

- [ ] **Step 4: Commit**

```bash
git add src/components/chapters/ThreadDial.tsx src/app/page.tsx
git commit -m "feat: build the Thread <-> Dial chapter"
```

---

## Task 9: Build the Dashboard chapter

**Files:**
- Create: `src/components/chapters/Dashboard.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `DonutRing` (Task 4); `CountUp` (Task 5).
- Produces: `Dashboard()` — a `<section id="dashboard">`, no props. All demo data (categories/KPIs/history) is inline in this file — it's presentation-only fixture data, not shared elsewhere.

- [ ] **Step 1: Create `src/components/chapters/Dashboard.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { DonutRing } from "@/components/ui/DonutRing";
import { CountUp } from "@/components/ui/CountUp";

const categories = [
  { label: "Medicine", value: 7, pct: 100, color: "#7A6AB0" },
  { label: "Exercise", value: 2, pct: 60, color: "#3FA6A6" },
  { label: "Food", value: 6, pct: 63, color: "#A4453F" },
  { label: "Sleep", value: 1, pct: 90, color: "#5C9A7A" },
  { label: "Baby", value: 6, pct: 68, color: "#C4874A" },
];

const kpis = [
  { label: "Day streak", value: 12, suffix: "" },
  { label: "Tasks", value: 22, suffix: "" },
  { label: "7-day avg", value: 83, suffix: "%" },
];

const history = [
  { label: "Today", pct: 58 },
  { label: "9/8", pct: 90 },
  { label: "9/7", pct: 75 },
  { label: "9/6", pct: 100 },
];

export function Dashboard() {
  return (
    <section id="dashboard" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            03 · Dashboard
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Every plan, measured in real time.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Completion by category, day streaks, a 7-day average, and a
            day-by-day history you can tap back through — the whole family
            sees the same picture.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Reveal className="flex justify-center">
            <DonutRing
              segments={categories}
              size={220}
              strokeWidth={18}
              centerValue="58%"
              centerLabel="TODAY"
            />
          </Reveal>

          <div>
            <div className="grid grid-cols-3 gap-4">
              {kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-card border border-void-border bg-void-elevated px-4 py-4 text-center"
                >
                  <div className="font-mono text-2xl font-extrabold text-glow-amber">
                    <CountUp value={kpi.value} suffix={kpi.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-sub-hud">
                    {kpi.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-sub-hud">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.label}
                    </span>
                    <span className="font-mono">{category.pct}%</span>
                  </div>
                  <div className="h-[5px] w-full overflow-hidden rounded-full bg-void-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-sub-hud">
            Day by day
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {history.map((day, index) => (
              <motion.div
                key={day.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-chip border border-void-border bg-void-elevated px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink-hud">
                    {day.label}
                  </span>
                  <span className="font-mono text-sm font-bold text-glow-amber">
                    {day.pct}%
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-void-border">
                  <div
                    className="h-full rounded-full bg-glow-amber"
                    style={{ width: `${day.pct}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `Dashboard` to `src/app/page.tsx`** (insert after `<ThreadDial />`)

- [ ] **Step 3: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the Dashboard chapter. Confirm: a large 5-segment donut ring draws in, three KPI tiles count up, five category progress bars fill in left-to-right, and four "day by day" pills fill their bars.

- [ ] **Step 4: Commit**

```bash
git add src/components/chapters/Dashboard.tsx src/app/page.tsx
git commit -m "feat: build the Dashboard chapter"
```

---

## Task 10: Build the Logs chapter

**Files:**
- Create: `src/lib/content/logs.ts`
- Create: `src/components/chapters/Logs.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `PhoneFrame` (Task 4).
- Produces: `logActivities: LogEntry[]` and `quickChips: string[]` from `src/lib/content/logs.ts`, where `LogEntry = { id: string; emoji: string; label: string; time: string; detail?: string }`. `Logs()` — a `<section id="logs">`, no props.

- [ ] **Step 1: Create `src/lib/content/logs.ts`**

```ts
export type LogEntry = {
  id: string;
  emoji: string;
  label: string;
  time: string;
  detail?: string;
};

export const logActivities: LogEntry[] = [
  { id: "feed", emoji: "🍼", label: "Feed", time: "10:00 AM", detail: "30 min" },
  { id: "sleep", emoji: "😴", label: "Sleep", time: "11:00 AM", detail: "3 hr" },
  { id: "urine", emoji: "💧", label: "Urine", time: "1:30 AM", detail: "1st time" },
  { id: "poop", emoji: "🧷", label: "Poop", time: "2:00 AM", detail: "1st time" },
  { id: "cry", emoji: "😢", label: "Crying", time: "3:00 AM", detail: "After feed, burping" },
];

export const quickChips = ["Feed", "Sleep", "Urine", "Poop", "Cry", "Play"];
```

- [ ] **Step 2: Create `src/components/chapters/Logs.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { logActivities, quickChips } from "@/lib/content/logs";

export function Logs() {
  const [entries, setEntries] = useState(logActivities);

  function addEntry(label: string) {
    setEntries((prev) => [
      ...prev,
      {
        id: `${label}-${prev.length}`,
        emoji: "✨",
        label,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
  }

  return (
    <section id="logs" className="border-b border-void-border py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            04 · Logs
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-hud md:text-5xl">
            Built for the moments you don&apos;t have time to type.
          </h2>
          <p className="mt-4 max-w-md text-lg text-sub-hud">
            Predefined quick-entry chips for the things you track most —
            feeds, sleep, diapers — with the timestamp captured
            automatically and editable when the log doesn&apos;t match the
            clock. Tap a chip below and watch it land in the timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => addEntry(chip)}
                className="rounded-chip border border-void-border bg-void-elevated px-4 py-2 text-sm font-bold text-ink-hud transition-colors hover:border-glow-amber/50 hover:text-glow-amber"
              >
                {chip}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <PhoneFrame>
            <p className="text-sm font-extrabold text-ink-hud">
              Baby activities
            </p>
            <div className="mt-4 max-h-[440px] space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between rounded-chip border border-void-border bg-void px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink-hud">
                      <span>{entry.emoji}</span>
                      {entry.label}
                    </span>
                    <span className="font-mono text-xs text-sub-hud">
                      {entry.time}
                      {entry.detail ? ` · ${entry.detail}` : ""}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `Logs` to `src/app/page.tsx`** (insert after `<Dashboard />`)

- [ ] **Step 4: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the Logs chapter, click a quick-entry chip (e.g. "Feed"). Confirm: a new entry animates into the phone mockup's timeline immediately.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/logs.ts src/components/chapters/Logs.tsx src/app/page.tsx
git commit -m "feat: build the Logs chapter"
```

---

## Task 11: Build the Reminders chapter

**Files:**
- Create: `src/lib/content/reminders.ts`
- Create: `src/components/chapters/Reminders.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4).
- Produces: `reminders: ReminderEvent[]` from `src/lib/content/reminders.ts`, where `ReminderEvent = { id: string; title: string; tag: string; date: string; notifyBefore: string }`. `Reminders()` — a `<section id="reminders">`, no props.

- [ ] **Step 1: Create `src/lib/content/reminders.ts`**

```ts
export type ReminderEvent = {
  id: string;
  title: string;
  tag: string;
  date: string;
  notifyBefore: string;
};

export const reminders: ReminderEvent[] = [
  { id: "cert", title: "Baby's birth certificate", tag: "Baby", date: "Aug 29", notifyBefore: "3 days daily before" },
  { id: "vax", title: "6-month vaccination", tag: "Vaccination", date: "Sep 14", notifyBefore: "1 day before" },
  { id: "checkup", title: "Postpartum checkup", tag: "Health", date: "Sep 20", notifyBefore: "2 days before" },
];
```

- [ ] **Step 2: Create `src/components/chapters/Reminders.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { reminders } from "@/lib/content/reminders";

export function Reminders() {
  return (
    <section id="reminders" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            05 · Reminders
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Reminded before it matters, not after.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Set a date, choose how early to be notified — once, or daily
            for a few days leading up — tag it, and it surfaces exactly
            when you need it, not buried in a list.
          </p>
        </Reveal>

        <div className="mt-14 space-y-4">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-wrap items-center justify-between gap-4 rounded-card-lg border border-void-border bg-void-elevated px-6 py-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-chip bg-glow-purple/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-glow-purple">
                    {reminder.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-ink-hud">
                    {reminder.title}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-sub-hud">
                  🔔 {reminder.notifyBefore}
                </p>
              </div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-chip bg-glow-amber/15 px-4 py-2 font-mono text-sm font-bold text-glow-amber"
              >
                {reminder.date}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `Reminders` to `src/app/page.tsx`** (insert after `<Logs />`)

- [ ] **Step 4: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the Reminders chapter. Confirm: three reminder cards enter with a staggered fade-up, each with a purple tag chip and a slowly pulsing amber date badge.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/reminders.ts src/components/chapters/Reminders.tsx src/app/page.tsx
git commit -m "feat: build the Reminders chapter"
```

---

## Task 12: Build the Family & roles chapter

**Files:**
- Create: `src/lib/content/family.ts`
- Create: `src/components/chapters/Family.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal` (Task 4).
- Produces: `familyMembers: FamilyMember[]` from `src/lib/content/family.ts`, where `FamilyMember = { id: string; initial: string; name: string; role: "Owner" | "Executor" | "Observer" }`. `Family()` — a `<section id="family">`, no props.

- [ ] **Step 1: Create `src/lib/content/family.ts`**

```ts
export type FamilyMember = {
  id: string;
  initial: string;
  name: string;
  role: "Owner" | "Executor" | "Observer";
};

export const familyMembers: FamilyMember[] = [
  { id: "you", initial: "J", name: "You", role: "Owner" },
  { id: "partner", initial: "A", name: "Alex", role: "Executor" },
  { id: "grandma", initial: "M", name: "Mom", role: "Observer" },
];
```

- [ ] **Step 2: Create `src/components/chapters/Family.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { familyMembers } from "@/lib/content/family";

const roleColor: Record<string, string> = {
  Owner: "text-glow-amber bg-glow-amber/15",
  Executor: "text-glow-purple bg-glow-purple/15",
  Observer: "text-sub-hud bg-void-border/40",
};

export function Family() {
  const [invited, setInvited] = useState(false);

  return (
    <section id="family" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            06 · Family &amp; roles
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Everyone sees the same picture.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Invite family by email. Executors log tasks, Observers just
            follow along — the owner decides who does what, and everyone
            shares one dashboard.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-14 max-w-xl rounded-card-lg border border-void-border bg-void-elevated p-6"
        >
          <div className="space-y-3">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between rounded-chip bg-void/60 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-glow-amber font-mono text-sm font-bold text-void">
                    {member.initial}
                  </span>
                  <span className="text-sm font-bold text-ink-hud">
                    {member.name}
                  </span>
                </div>
                <span
                  className={`rounded-chip px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${roleColor[member.role]}`}
                >
                  {member.role}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 border-t border-void-border pt-5">
            {invited ? (
              <p className="font-mono text-sm font-bold text-glow-amber">
                ✓ Invite sent
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setInvited(true)}
                className="w-full rounded-chip border border-dashed border-void-border py-3 text-sm font-bold text-sub-hud transition-colors hover:border-glow-amber/50 hover:text-glow-amber"
              >
                + Invite family member
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `Family` to `src/app/page.tsx`** (insert after `<Reminders />`)

- [ ] **Step 4: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the Family chapter, click "+ Invite family member". Confirm: the button is replaced by "✓ Invite sent".

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/family.ts src/components/chapters/Family.tsx src/app/page.tsx
git commit -m "feat: build the Family & roles chapter"
```

---

## Task 13: Build the Final CTA chapter

**Files:**
- Create: `src/components/chapters/FinalCta.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `DonutRing` (Task 4); `DownloadButton` (Task 3).
- Produces: `FinalCta()` — a `<section id="download">`, no props.

- [ ] **Step 1: Create `src/components/chapters/FinalCta.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Reveal } from "@/components/ui/Reveal";
import { DonutRing } from "@/components/ui/DonutRing";

const segments = [
  { label: "Medicine", value: 7, color: "#7A6AB0" },
  { label: "Exercise", value: 2, color: "#3FA6A6" },
  { label: "Food", value: 6, color: "#A4453F" },
  { label: "Sleep", value: 1, color: "#5C9A7A" },
  { label: "Baby", value: 6, color: "#C4874A" },
];

export function FinalCta() {
  return (
    <section id="download" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,163,61,0.16),transparent_55%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_0_50px_rgba(232,163,61,0.35)]"
          >
            <DonutRing
              segments={segments}
              size={200}
              strokeWidth={14}
              centerValue="🌸"
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-10 text-3xl font-extrabold text-ink-hud md:text-5xl">
            Your family&apos;s routines deserve better than a group chat.
          </h2>
          <p className="mt-4 text-lg text-sub-hud">
            Free to start. No credit card. Straight to your Android device.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-8">
          <DownloadButton className="!px-8 !py-4 text-base" />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `FinalCta` to `src/app/page.tsx`** (insert after `<Family />`, as the last chapter before `Footer`)

Full expected `src/app/page.tsx` at this point:

```tsx
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";
import { Plans } from "@/components/chapters/Plans";
import { ThreadDial } from "@/components/chapters/ThreadDial";
import { Dashboard } from "@/components/chapters/Dashboard";
import { Logs } from "@/components/chapters/Logs";
import { Reminders } from "@/components/chapters/Reminders";
import { Family } from "@/components/chapters/Family";
import { FinalCta } from "@/components/chapters/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Plans />
        <ThreadDial />
        <Dashboard />
        <Logs />
        <Reminders />
        <Family />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify build, lint, and visually check**

Run: `npm run build && npm run lint` — expected: both succeed.

Run: `npm run dev`, scroll to the bottom. Confirm: a large glowing donut ring gently pulses above the closing headline and a final "Download APK" button.

- [ ] **Step 4: Commit**

```bash
git add src/components/chapters/FinalCta.tsx src/app/page.tsx
git commit -m "feat: build the Final CTA chapter"
```

---

## Task 14: Delete obsolete files and do full-site verification

**Files:**
- Delete: `src/components/sections/Hero.tsx`
- Delete: `src/components/sections/Features.tsx`
- Delete: `src/components/sections/UseCases.tsx`
- Delete: `src/components/sections/HowItWorks.tsx`
- Delete: `src/components/ui/HeroMockup.tsx`
- Delete: `src/components/ui/FeatureCard.tsx`
- Delete: `src/components/ui/UseCaseCard.tsx`
- Delete: `src/lib/content/features.ts`
- Delete: `src/lib/content/useCases.ts`
- Delete: `src/lib/content/howItWorks.ts`

**Interfaces:**
- Consumes: nothing (these files are unreferenced by `src/app/page.tsx` since Task 6 replaced its imports).
- Produces: nothing new — this is a cleanup task.

- [ ] **Step 1: Confirm nothing still imports the files to be deleted**

Run: `grep -rl "sections/Hero\|sections/Features\|sections/UseCases\|sections/HowItWorks\|ui/HeroMockup\|ui/FeatureCard\|ui/UseCaseCard\|content/features\|content/useCases\|content/howItWorks" src/`

Expected: no output (or only matches inside the files themselves, not external references). If any external file still imports one of these, stop and update that file first.

- [ ] **Step 2: Delete the obsolete files**

```bash
git rm src/components/sections/Hero.tsx src/components/sections/Features.tsx src/components/sections/UseCases.tsx src/components/sections/HowItWorks.tsx src/components/ui/HeroMockup.tsx src/components/ui/FeatureCard.tsx src/components/ui/UseCaseCard.tsx src/lib/content/features.ts src/lib/content/useCases.ts src/lib/content/howItWorks.ts
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both succeed with no unused-file or broken-import errors.

- [ ] **Step 4: Full visual pass on desktop width**

Run: `npm run dev`, open `http://localhost:3000` at a desktop viewport (≥1280px). Scroll from top to bottom through all 8 chapters in order (Hero → Plans → Thread & Dial → Dashboard → Logs → Reminders → Family → Final CTA). Confirm every chapter's entrance animation fires once and doesn't re-fire jarringly when scrolling back up past it.

- [ ] **Step 5: Full visual pass on mobile width**

Resize the browser (or use device emulation) to ≈390px wide. Scroll through all 8 chapters again. Confirm: no horizontal scrollbar anywhere, all grids collapse to a single column, the phone mockups shrink to fit, and the nav's link row is hidden (only the logo and Download button should show — this is the existing `hidden md:flex` behavior on the nav links, unchanged from before).

- [ ] **Step 6: Verify the reduced-motion fallback**

Enable "prefers reduced motion" (OS-level accessibility setting, or via browser devtools' rendering panel → "Emulate CSS media feature prefers-reduced-motion: reduce"), reload the page. Confirm: the `ParticleField` canvas in the Hero renders static dots instead of animating, and section content still appears (opacity fades still apply — Framer Motion's `whileInView` animations still run since they aren't gated on `prefers-reduced-motion` in this implementation, but they should not feel broken or cause layout shift).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete pre-rebuild section and content files"
```

---

## Self-Review Notes

- **Spec coverage:** all 8 chapters (Task 6–13), void/glow palette (Task 2), Framer Motion as sole engine (Task 1), no site-wide toggle (Task 3), no 3D/WebGL (never introduced), live-rebuilt demos not screenshots (every chapter), mobile layout check (Task 14), reduced-motion check (Task 14) are each covered by a task.
- **Type consistency checked:** `DownloadButton`'s `variant` prop removal (Task 3) is propagated — no later task passes `variant`. `DonutRing`'s `segments`/`size`/`strokeWidth`/`centerValue`/`centerLabel` signature (Task 4) is used identically in Hero (Task 6), Dashboard (Task 9), and FinalCta (Task 13). `ChatBubble`/`DialRow`'s dependency on ancestor `.thread`/`.dial` scoping (Task 5) is called out explicitly and only ever used inside `ThreadDial.tsx` (Task 8), which provides that scoping.
- **Known risk flagged with a fallback:** the `DonutRing` `pathLength`/`pathOffset` animation technique (Task 4) is the one piece of this plan relying on a less common Framer Motion API surface — a tested-pattern manual `strokeDasharray`/`strokeDashoffset` fallback is included inline in that task, and Task 6's verification step explicitly asks the executor to check for the failure mode (gaps/overlapping arcs) and apply the fallback if needed.
