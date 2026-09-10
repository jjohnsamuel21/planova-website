"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center rounded-chip border border-border bg-surface-alt p-1 text-sm font-semibold">
      {(["thread", "dial"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setTheme(option)}
          aria-pressed={theme === option}
          className={`rounded-chip px-3 py-1 capitalize transition-colors ${
            theme === option
              ? "bg-accent text-accent-ink"
              : "text-sub hover:text-ink"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
