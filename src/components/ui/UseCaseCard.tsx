import type { UseCase } from "@/lib/content/useCases";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <div className="rounded-card-sm bg-surface-alt p-5">
      <div className="text-2xl">{useCase.emoji}</div>
      <h3 className="mt-3 font-bold text-ink">{useCase.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-sub">{useCase.description}</p>
    </div>
  );
}
