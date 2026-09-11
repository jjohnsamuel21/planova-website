"use client";

import { motion } from "framer-motion";
import { VIEWPORT } from "@/lib/motion";

export function DialRow({
  title,
  due,
  progress,
  delay = 0,
}: {
  title: string;
  due?: string;
  progress: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between gap-3 rounded-card-sm border border-border bg-surface-alt px-4 py-3"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="min-w-0 text-sm font-bold text-ink">{title}</span>
          {due && (
            <span className="shrink-0 whitespace-nowrap rounded-chip bg-warning-bg px-2 py-0.5 font-mono text-[10px] font-bold text-warning">
              Due {due}
            </span>
          )}
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </div>
      <span className="font-mono text-xs font-bold text-sub">
        {progress}%
      </span>
    </motion.div>
  );
}
