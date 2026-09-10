"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "thread" | "dial";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

const STORAGE_KEY = "planova-theme";

// Runs before hydration (see layout.tsx) so there's no flash of the wrong theme.
export const noFoucScript = `
(function () {
  try {
    var theme = localStorage.getItem("${STORAGE_KEY}");
    if (theme === "dial") document.documentElement.classList.add("dial");
  } catch (e) {}
})();
`;

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "thread";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dial" ? "dial" : "thread";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dial", theme === "dial");
    document.documentElement.classList.toggle("thread", theme === "thread");
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
