import { howItWorks } from "@/lib/content/howItWorks";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-ink">How it works</h2>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
        {howItWorks.map((step, i) => (
          <div key={step.step} className="relative text-center md:text-left">
            {i < howItWorks.length - 1 && (
              <div className="absolute top-5 left-1/2 hidden h-px w-full -translate-x-0 bg-border md:block" />
            )}
            <div className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-accent font-mono font-bold text-accent-ink md:mx-0">
              {step.step}
            </div>
            <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sub">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
