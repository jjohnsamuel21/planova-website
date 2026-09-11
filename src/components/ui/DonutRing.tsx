"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/motion";

export type DonutSegment = {
  label: string;
  value: number;
  color: string;
};

export function DonutRing({
  segments,
  size = 176,
  strokeWidth = 16,
  centerValue,
  centerLabel,
  trackColor = "#26315A",
}: {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerValue?: ReactNode;
  centerLabel?: string;
  trackColor?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  const arcs = segments.reduce<
    Array<DonutSegment & { fraction: number; offset: number }>
  >((acc, segment) => {
    const fraction = segment.value / total;
    const previous = acc[acc.length - 1];
    const offset = previous ? previous.offset + previous.fraction : 0;
    return [...acc, { ...segment, fraction, offset }];
  }, []);

  return (
    <div
      className="grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="col-start-1 row-start-1"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          opacity={0.35}
        />
        {arcs.map((arc, index) => {
          const circumference = 2 * Math.PI * radius;
          const arcLength = arc.fraction * circumference;
          const startOffset = arc.offset * circumference;
          return (
            <motion.circle
              key={arc.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeDasharray={`${arcLength} ${circumference - arcLength}`}
              initial={{ strokeDashoffset: -startOffset + arcLength }}
              whileInView={{ strokeDashoffset: -startOffset }}
              viewport={VIEWPORT}
              transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
            />
          );
        })}
      </svg>
      {(centerValue || centerLabel) && (
        <div className="col-start-1 row-start-1 flex flex-col items-center">
          {centerValue && (
            <span className="font-mono text-3xl font-extrabold text-ink-hud">
              {centerValue}
            </span>
          )}
          {centerLabel && (
            <span className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-sub-hud">
              {centerLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
