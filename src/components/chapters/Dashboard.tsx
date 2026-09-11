"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { DonutRing } from "@/components/ui/DonutRing";
import { CountUp } from "@/components/ui/CountUp";
import { categoryColors } from "@/lib/theme/tokens";
import { VIEWPORT } from "@/lib/motion";

// Same category/value pairs as the shared donut segments in
// src/lib/content/categories.ts, plus per-category completion `pct`
// used by this chapter's progress bars.
const categories = [
  { label: "Medicine", value: 7, pct: 100, color: categoryColors.purple },
  { label: "Exercise", value: 2, pct: 60, color: categoryColors.teal },
  { label: "Food", value: 6, pct: 63, color: categoryColors.red },
  { label: "Sleep", value: 1, pct: 90, color: categoryColors.green },
  { label: "Baby", value: 6, pct: 68, color: categoryColors.orange },
];

const kpis = [
  { label: "Day streak", value: 12, suffix: "" },
  { label: "Tasks", value: 22, suffix: "" },
  { label: "7-day avg", value: 83, suffix: "%" },
];

const history = [
  { label: "Today", pct: 58 },
  { label: "9/8", pct: 90 },
  { label: "9/7", pct: 75 },
  { label: "9/6", pct: 100 },
];

export function Dashboard() {
  return (
    <section id="dashboard" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            03 · Dashboard
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Every plan, measured in real time.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Completion by category, day streaks, a 7-day average, and a
            day-by-day history you can tap back through — the whole family
            sees the same picture.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Reveal className="flex justify-center">
            <DonutRing
              segments={categories}
              size={220}
              strokeWidth={18}
              centerValue="58%"
              centerLabel="TODAY"
            />
          </Reveal>

          <div>
            <div className="grid grid-cols-3 gap-4">
              {kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="rounded-card border border-void-border bg-void-elevated px-4 py-4 text-center"
                >
                  <div className="font-mono text-2xl font-extrabold text-glow-amber">
                    <CountUp value={kpi.value} suffix={kpi.suffix} />
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-sub-hud">
                    {kpi.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-sub-hud">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.label}
                    </span>
                    <span className="font-mono">{category.pct}%</span>
                  </div>
                  <div className="h-[5px] w-full overflow-hidden rounded-full bg-void-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.pct}%` }}
                      viewport={VIEWPORT}
                      transition={{ duration: 0.8, delay: 0.2 + index * 0.08 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-sub-hud">
            Day by day
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {history.map((day, index) => (
              <motion.div
                key={day.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-chip border border-void-border bg-void-elevated px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-ink-hud">
                    {day.label}
                  </span>
                  <span className="font-mono text-sm font-bold text-glow-amber">
                    {day.pct}%
                  </span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-void-border">
                  <div
                    className="h-full rounded-full bg-glow-amber"
                    style={{ width: `${day.pct}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
