"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { DialRow } from "@/components/ui/DialRow";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

const tasks = [
  { id: "iron", title: "Morning — Iron Syrup, 1 cap", due: undefined as string | undefined, progress: 100 },
  { id: "calcium", title: "Afternoon — Calcium, 1 tab", due: "1:00 PM", progress: 100 },
  { id: "night", title: "Night — Iron Syrup, 1 cap", due: "9:00 PM", progress: 0 },
  { id: "ointment", title: "Ointment (if needed)", due: undefined as string | undefined, progress: 40 },
];

export function ThreadDial() {
  const [mode, setMode] = useState<"thread" | "dial">("thread");

  return (
    <section id="thread-dial" className="border-b border-void-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-glow-amber">
            02 · Thread &amp; Dial
          </span>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-ink-hud md:text-5xl">
            Two ways to log. Same routine.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-sub-hud">
            Thread is a calm, chat-style feed for logging as you go. Dial is
            a dense, dark control panel with a live progress ring. Switch
            anytime — it&apos;s the same data, just how it feels to use it.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <div className="inline-flex items-center rounded-chip border border-void-border bg-void-elevated p-1">
            {(["thread", "dial"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                aria-pressed={mode === option}
                className={`rounded-chip px-5 py-2 text-sm font-bold capitalize transition-colors ${
                  mode === option
                    ? "bg-glow-amber text-void"
                    : "text-sub-hud hover:text-ink-hud"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <PhoneFrame className="!min-h-0">
            <AnimatePresence mode="wait">
              {mode === "thread" ? (
                <motion.div
                  key="thread"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="thread min-h-[520px] rounded-2xl bg-background p-4"
                >
                  <p className="text-sm font-extrabold text-ink">Medicine</p>
                  <div className="mt-4 space-y-3">
                    {tasks.map((task, index) => (
                      <ChatBubble
                        key={task.id}
                        title={task.title}
                        meta={task.due ? `Due ${task.due}` : "Sitz bath — 2/3 times"}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="dial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="dial min-h-[520px] rounded-2xl bg-background p-4"
                >
                  <p className="text-sm font-extrabold text-ink">Medicine</p>
                  <div className="mt-4 space-y-3">
                    {tasks.map((task, index) => (
                      <DialRow
                        key={task.id}
                        title={task.title}
                        due={task.due}
                        progress={task.progress}
                        delay={index * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
