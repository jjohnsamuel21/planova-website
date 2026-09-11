"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { logActivities, quickChips } from "@/lib/content/logs";

export function Logs() {
  const [entries, setEntries] = useState(logActivities);

  function addEntry(label: string) {
    setEntries((prev) => [
      ...prev,
      {
        id: `${label}-${prev.length}`,
        emoji: "✨",
        label,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
  }

  return (
    <section id="logs" className="border-b border-void-border py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            04 · Logs
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-hud md:text-5xl">
            Built for the moments you don&apos;t have time to type.
          </h2>
          <p className="mt-4 max-w-md text-lg text-sub-hud">
            Predefined quick-entry chips for the things you track most —
            feeds, sleep, diapers — with the timestamp captured
            automatically and editable when the log doesn&apos;t match the
            clock. Tap a chip below and watch it land in the timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {quickChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => addEntry(chip)}
                className="rounded-chip border border-void-border bg-void-elevated px-4 py-2 text-sm font-bold text-ink-hud transition-colors hover:border-glow-amber/50 hover:text-glow-amber"
              >
                {chip}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <PhoneFrame>
            <p className="text-sm font-extrabold text-ink-hud">
              Baby activities
            </p>
            <div className="mt-4 max-h-[440px] space-y-3 overflow-y-auto">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between rounded-chip border border-void-border bg-void px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink-hud">
                      <span>{entry.emoji}</span>
                      {entry.label}
                    </span>
                    <span className="font-mono text-xs text-sub-hud">
                      {entry.time}
                      {entry.detail ? ` · ${entry.detail}` : ""}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </PhoneFrame>
        </Reveal>
      </div>
    </section>
  );
}
