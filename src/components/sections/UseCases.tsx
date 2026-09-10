import { useCases } from "@/lib/content/useCases";
import { UseCaseCard } from "@/components/ui/UseCaseCard";

export function UseCases() {
  return (
    <section id="use-cases" className="bg-surface-alt/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-ink">
            Made for whoever&apos;s running the household
          </h2>
          <p className="mt-3 text-sub">
            New parents, caregivers, roommates — anyone coordinating routines
            together.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
