import { categoryColors } from "@/lib/theme/tokens";

export type DonutCategorySegment = {
  label: string;
  value: number;
  color: string;
};

// Shared source of truth for the 5-segment "today's activity" donut ring
// used across Hero, Dashboard, and FinalCta.
export const donutCategorySegments: DonutCategorySegment[] = [
  { label: "Medicine", value: 7, color: categoryColors.purple },
  { label: "Exercise", value: 2, color: categoryColors.teal },
  { label: "Food", value: 6, color: categoryColors.red },
  { label: "Sleep", value: 1, color: categoryColors.green },
  { label: "Baby", value: 6, color: categoryColors.orange },
];
