import { DownloadButton } from "@/components/ui/DownloadButton";
import { Badge } from "@/components/ui/Badge";
import { ParticleField } from "@/components/ui/ParticleField";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { DonutRing } from "@/components/ui/DonutRing";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { donutCategorySegments } from "@/lib/content/categories";

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
            </div>
            <div className="mt-6 flex justify-center">
              <DonutRing
                segments={donutCategorySegments}
                size={168}
                strokeWidth={14}
                centerValue={<CountUp value={58} suffix="%" />}
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
