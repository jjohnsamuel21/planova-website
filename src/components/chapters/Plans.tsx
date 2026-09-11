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
