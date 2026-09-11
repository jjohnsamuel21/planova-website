"use client";

import { motion } from "framer-motion";
import { VIEWPORT } from "@/lib/motion";

export function ChatBubble({
  title,
  meta,
  delay = 0,
}: {
  title: string;
  meta?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, delay }}
      className="max-w-[85%] rounded-card rounded-bl-md bg-surface px-4 py-3 text-sm font-semibold text-ink shadow-card"
    >
      {title}
      {meta && (
        <div className="mt-1 text-xs font-normal text-sub">{meta}</div>
      )}
    </motion.div>
  );
}
