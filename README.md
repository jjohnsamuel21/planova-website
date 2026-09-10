# Planova Website

Marketing site for **Planova** — a collaborative family routine tracker
(Flutter + Firebase, Android). Single-page site: hero, features, use cases,
how-it-works, and a direct APK download.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## APK download

The download button links to `public/downloads/planova.apk`. Drop the
release APK there (see `public/downloads/README.md`) — file must be named
`planova.apk`, or update `APK_PATH` in `src/lib/content/download.ts`.

## Theming

The site mirrors the app's two palettes — **Thread** (light) and **Dial**
(dark) — as CSS custom properties in `src/app/globals.css`, toggled via a
`dial` class on `<html>` (see `src/components/theme/ThemeProvider.tsx`).
Defaults to Thread; choice persists in `localStorage`.

## Structure

```
src/app/            layout, page, global styles
src/components/
  layout/            Nav, Footer
  theme/             ThemeProvider, ThemeToggle
  sections/          Hero, Features, UseCases, HowItWorks
  ui/                FeatureCard, UseCaseCard, DownloadButton, HeroMockup, Badge
src/lib/
  theme/tokens.ts    JS-side mirror of the CSS design tokens
  content/           copy/data for features, use cases, steps, download path
public/logo/         brand assets copied from the app repo
public/downloads/    drop the release APK here
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check
