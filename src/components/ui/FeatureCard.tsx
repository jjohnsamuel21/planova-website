import type { Feature } from "@/lib/content/features";

const categoryBg: Record<Feature["categoryColor"], string> = {
  purple: "bg-category-purple/15 text-category-purple",
  green: "bg-category-green/15 text-category-green",
  orange: "bg-category-orange/15 text-category-orange",
  blue: "bg-category-blue/15 text-category-blue",
  red: "bg-category-red/15 text-category-red",
  teal: "bg-category-teal/15 text-category-teal",
  pink: "bg-category-pink/15 text-category-pink",
};

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-card-sm text-2xl ${categoryBg[feature.categoryColor]}`}
      >
        {feature.emoji}
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-ink">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-sub">{feature.description}</p>
    </div>
  );
}
