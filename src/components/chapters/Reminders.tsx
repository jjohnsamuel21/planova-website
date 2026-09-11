"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { reminders } from "@/lib/content/reminders";

export function Reminders() {
  return (
    <section id="reminders" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            05 · Reminders
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Reminded before it matters, not after.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Set a date, choose how early to be notified — once, or daily
            for a few days leading up — tag it, and it surfaces exactly
            when you need it, not buried in a list.
          </p>
        </Reveal>

        <div className="mt-14 space-y-4">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-wrap items-center justify-between gap-4 rounded-card-lg border border-void-border bg-void-elevated px-6 py-5"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-chip bg-glow-purple/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-glow-purple">
                    {reminder.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-ink-hud">
                    {reminder.title}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-sub-hud">
                  🔔 {reminder.notifyBefore}
                </p>
              </div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-chip bg-glow-amber/15 px-4 py-2 font-mono text-sm font-bold text-glow-amber"
              >
                {reminder.date}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
