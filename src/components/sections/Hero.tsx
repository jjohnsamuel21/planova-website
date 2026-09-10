import { DownloadButton } from "@/components/ui/DownloadButton";
import { HeroMockup } from "@/components/ui/HeroMockup";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section id="hero" className="overflow-hidden">
      <div
        className="mx-auto max-w-6xl rounded-sheet px-6 py-16 md:px-12 md:py-24"
        style={{
          background: "linear-gradient(160deg, #8F7BD6, #7A6AB0)",
        }}
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Badge>🌸 Android · direct APK download</Badge>
            <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
              Family routines, tracked together.
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Planova helps families build and stick to shared routines —
              medication, chores, recovery, anything — with a daily log
              everyone can see.
            </p>
            <DownloadButton variant="onGradient" className="mt-8" />
          </div>
          <div className="flex justify-center md:justify-end">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
