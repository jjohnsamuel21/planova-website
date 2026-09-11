"use client";

import { motion } from "framer-motion";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Reveal } from "@/components/ui/Reveal";
import { DonutRing } from "@/components/ui/DonutRing";

const segments = [
  { label: "Medicine", value: 7, color: "#7A6AB0" },
  { label: "Exercise", value: 2, color: "#3FA6A6" },
  { label: "Food", value: 6, color: "#A4453F" },
  { label: "Sleep", value: 1, color: "#5C9A7A" },
  { label: "Baby", value: 6, color: "#C4874A" },
];

export function FinalCta() {
  return (
    <section id="download" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,163,61,0.16),transparent_55%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_0_50px_rgba(232,163,61,0.35)]"
          >
            <DonutRing
              segments={segments}
              size={200}
              strokeWidth={14}
              centerValue="🌸"
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-10 text-3xl font-extrabold text-ink-hud md:text-5xl">
            Your family&apos;s routines deserve better than a group chat.
          </h2>
          <p className="mt-4 text-lg text-sub-hud">
            Free to start. No credit card. Straight to your Android device.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-8">
          <DownloadButton className="!px-8 !py-4 text-base" />
        </Reveal>
      </div>
    </section>
  );
}
