# Planova Marketing Site — Futuristic Rebuild

Status: approved by user, pending implementation plan.

## Problem

The current site (`src/app/page.tsx` + `src/components/sections/*`) is a
correct-but-flat template brochure: one gradient hero panel, three stacked
card-grid sections (Features, UseCases, HowItWorks), no motion, no
interactivity, and a hand-built CSS donut standing in for the app's real
UI. It undersells a genuinely well-designed product — the app has two
visually distinct modes (light "Thread" chat-log, dark amber "Dial"
ring-chart dashboard) that the site never shows. Real app screenshots
exist at `C:\personal\career\repositories\jjohnsamuel21\planova-v2\references\screenshots\`
and are unused.

Goal: rebuild the site so it feels as capable and "massive" as the app
actually is, in a distinctive dark, futuristic, HUD-like visual language —
enough to make visitors want to download the app directly from the
experience of the site itself.

## Non-goals

- No backend/API work — this is a static marketing site (Next.js App
  Router, client-rendered animation only).
- No changes to the Flutter app itself.
- No site-wide light mode. The dark HUD aesthetic *is* the brand
  statement for this rebuild; Thread's light palette appears only inside
  the Thread↔Dial demo panel (see Chapter 3), not as a toggle.
- No 3D/WebGL (Three.js / React Three Fiber). A hand-rolled 2D canvas
  particle/grid background delivers the ambiance without the bundle-size
  and perf risk of a 3D engine, for what is ultimately a page whose job
  is to convert a visit into a download.

## Approach

**Structure**: one continuous single-page scroll (no multi-page routing),
built as a sequence of full-viewport "chapters," each independently
animated on scroll entry. Sticky minimal nav with anchor jumps and a
persistent download CTA.

**Animation engine**: Framer Motion (`useScroll`/`useTransform` for
scroll-linked choreography, `whileInView` for entry reveals). Chosen over
GSAP (imperative, fights React's render model) and native CSS
`animation-timeline: view()` (Safari/Firefox support still too patchy to
risk on a page that must look flawless everywhere). A small hand-rolled
`<canvas>` component provides an ambient particle/grid field behind the
hero and persists (subtly) as a background layer.

**Product showcase**: every chapter's "proof" is a live, hand-rebuilt
interactive recreation of the real app UI — not static screenshots.
Segmented donut rings actually draw in via `stroke-dashoffset` animation,
KPI numbers actually count up, Thread chat bubbles actually stagger in,
Dial task rows actually render with real progress bars. One shared custom
phone-frame component (not a stock mockup image) wraps every demo so the
whole site reads as one continuous system. Real screenshots are not used
in the primary chapters (fidelity risk: they'd look flatter next to live
motion) but may be referenced later for a lightweight "press kit" /
secondary page if requested — out of scope for this rebuild.

## Visual system

- **Palette**: void background `#0A0E1A` (darker than the app's own Dial
  `#0C1220`, so the site reads as the "space" the app UI floats in).
  Primary accent: Dial's amber `#E8A33D` (glow, primary CTAs, active
  states). Secondary accent: Thread's purple `#7A6AB0` (used in gradients
  and specifically inside the Thread↔Dial chapter's light panel) — both
  colors are pulled directly from the app's own design tokens
  (`src/lib/theme/tokens.ts`), so the futurism stays brand-true rather
  than generic sci-fi cyan/teal.
- **Typography**: unchanged pairing — Nunito for UI/headlines, JetBrains
  Mono for all numerals, stats, percentages, timestamps (mono numerals do
  double duty as "HUD data" styling for free).
- **Motion language**: consistent beat per chapter — content sits inert/
  dim until ~20% into the viewport, then assembles (fade+rise for text,
  stroke-draw for rings, digit-tick for counters, stagger for lists/
  bubbles). The only continuously-looping element is the background
  particle field, kept subtle so it never competes with foreground
  content.
- **Accessibility**: `prefers-reduced-motion: reduce` collapses all
  scroll choreography to simple opacity fades and disables the canvas
  background entirely. Dark-palette contrast (text/glow-on-void) will be
  checked against WCAG AA — glow/blur effects are prone to failing this
  if not deliberately handled (solid-enough text color underneath any
  glow layer, not glow-as-the-only-treatment).

## Chapters (in scroll order)

1. **Hero** — full-viewport. Ambient particle/grid canvas behind glowing
   headline + subcopy. Live phone mockup: the Dashboard ring (from
   Chapter 4's component, reused) draws itself in once on load. Primary
   CTA: direct APK download (reusing existing `DownloadButton`/
   `src/lib/content/download.ts` logic). Scroll-down affordance.
2. **Plans** — "One system for every routine." Plan cards assemble on
   scroll entry (emoji tile, title, a frequency chip that cycles through
   Daily/Weekly/Once) — communicates breadth (medicine, chores, recovery,
   anything), pulling from `src/lib/content/features.ts`/`useCases.ts`
   content (to be rewritten, not reused verbatim).
3. **Thread ↔ Dial** — signature chapter. One task set rendered two ways:
   a light Thread chat-bubble panel that visually *transforms* into the
   dark amber Dial ring+list panel as the user scrolls through this
   chapter (or via an explicit toggle if scroll-linked morphing proves
   awkward at implementation time — decide during build, both satisfy the
   design intent). This is the one place the light Thread palette appears
   on the site.
4. **Dashboard & streaks** — segmented donut draws in per category (reusing
   real category colors from `tokens.ts`), 3-up KPI tiles (day streak /
   tasks / 7-day avg) count up from 0, a "day by day" history row animates
   in from a flat baseline. This is the highest-value live-data-viz
   moment on the site.
5. **Logs** — baby/caregiving quick-entry: predefined activity chips
   (Feed / Sleep / Diaper / Urine / Poop / Cry, matching the app's actual
   logging vocabulary) tap-populate a live timeline in the demo,
   demonstrating logging speed.
6. **Reminders** — an event card with a glowing/pulsing countdown toward
   its "notify before" threshold — dramatizes the proactive-reminder
   pitch (multi-stage notify-before, per `planova-v2` reference docs).
7. **Family & roles** — avatar stack assembles, Executor/Observer role
   badges appear, a one-line invite micro-demo (email input → sent state).
8. **Final CTA** — large orbiting/glowing phone mockup (hero's Dashboard
   demo, reprised), direct APK download button, reassurance microcopy
   ("Free to start · No credit card needed" style, matching the app's own
   sign-in screen copy).

Sticky nav: minimal glass/blur dark bar, anchor links to chapters 2–7,
persistent download button — present throughout the scroll, not just top
and bottom, since driving the download is the page's entire purpose.

## Components / file impact

This replaces the current section-based build almost entirely:

- **Remove**: `ThemeProvider.tsx`, `ThemeToggle.tsx` (no site-wide light
  mode), `HeroMockup.tsx` (replaced by the real live dashboard-ring
  component), the current `Hero`/`Features`/`UseCases`/`HowItWorks`
  section components (replaced by the 8 chapter components below).
- **New chapter components** under `src/components/chapters/`: `Hero.tsx`,
  `Plans.tsx`, `ThreadDial.tsx`, `Dashboard.tsx`, `Logs.tsx`,
  `Reminders.tsx`, `Family.tsx`, `FinalCta.tsx`.
- **New shared UI** under `src/components/ui/`: `PhoneFrame.tsx` (shared
  device chrome), `DonutRing.tsx` (animated segmented SVG ring, used in
  Hero/Dashboard/FinalCta), `ParticleField.tsx` (canvas background),
  `CountUp.tsx` (mono-numeral animated counter), `ChatBubble.tsx`/
  `DialRow.tsx` (Thread/Dial demo primitives).
- **Nav/Footer**: `Nav.tsx` simplified (drop theme toggle, keep anchor
  links + download button); `Footer.tsx` largely kept, restyled dark.
- **Tokens**: extend `src/lib/theme/tokens.ts` / `globals.css` with the
  new void/glow marketing-site tokens, alongside (not replacing) the
  existing Thread/Dial tokens, since Thread/Dial values are still used
  live inside Chapter 3 and throughout as accent colors.
- **Content**: rewrite `src/lib/content/*.ts` copy to match the new
  chapter structure and voice; `download.ts` logic (APK link) is reused
  as-is.
- **New dependency**: `framer-motion`.

## Testing / verification

- No backend logic to unit-test; verification is visual + behavioral:
  run the dev server, scroll through every chapter, confirm each
  animation triggers correctly on enter and doesn't re-trigger jarringly
  on re-scroll.
- Verify `prefers-reduced-motion` fallback (OS-level toggle) collapses
  motion correctly.
- Check responsive behavior at mobile width (this is an Android app's
  marketing site — mobile visitors are a primary audience, not an edge
  case) — chapters must degrade to a sane stacked layout, not just a
  squeezed desktop layout.
- Run `npm run build`/lint to confirm no type errors from the rebuild.
- Manual contrast check on dark-palette text/glow combinations.
