import { features } from "@/lib/content/features";
import { FeatureCard } from "@/components/ui/FeatureCard";

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-ink">
          Everything a family routine needs
        </h2>
        <p className="mt-3 text-sub">
          Built around the same ideas that make the app work day to day.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
