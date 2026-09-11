// Mirrors the CSS custom properties defined in src/app/globals.css.
// Keep byte-identical to globals.css when either changes.

export const threadColors = {
  background: "#F6F3FC",
  surface: "#FFFFFF",
  surfaceAlt: "#EFEAFC",
  border: "#E7E1F5",
  ink: "#2B2740",
  sub: "#8A83A6",
  faint: "#B7B0D6",
  accent: "#7A6AB0",
  accentInk: "#FFFFFF",
  pillBg: "#EFEAFC",
  pillText: "#6A5BB0",
  danger: "#A4453F",
  dangerBg: "#FCEEEE",
  success: "#5C9A7A",
  successBg: "#EAF6EF",
  warning: "#C4874A",
  warningBg: "#FDF1E4",
} as const;

export const dialColors = {
  background: "#0C1220",
  surface: "#121A2E",
  surfaceAlt: "#161F38",
  surfaceAlt2: "#182240",
  border: "#26315A",
  ink: "#E9EDF7",
  sub: "#8792A6",
  faint: "#5C6885",
  accent: "#E8A33D",
  accentInk: "#121A2E",
  pillBg: "#1E2A4D",
  pillText: "#A8B3CC",
  danger: "#A4453F",
  dangerBg: "#FCEEEE",
  success: "#5C9A7A",
  successBg: "#EAF6EF",
  warning: "#C4874A",
  warningBg: "#FDF1E4",
} as const;

export const categoryColors = {
  purple: "#7A6AB0",
  green: "#5C9A7A",
  orange: "#C4874A",
  blue: "#4F8FE0",
  red: "#A4453F",
  teal: "#3FA6A6",
  pink: "#C48FD6",
} as const;

export type CategoryColor = keyof typeof categoryColors;

export const hudColors = {
  void: "#0A0E1A",
  voidElevated: "#10162A",
  voidBorder: "#1E2740",
  glowAmber: "#E8A33D",
  glowAmberSoft: "rgba(232, 163, 61, 0.35)",
  glowPurple: "#7A6AB0",
  glowPurpleSoft: "rgba(122, 106, 176, 0.35)",
  glowPurpleText: "#A594D6",
  inkHud: "#E9EDF7",
  subHud: "#8792A6",
  faintHud: "#4B5670",
} as const;
