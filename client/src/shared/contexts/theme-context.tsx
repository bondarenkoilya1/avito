import { createContext, useContext } from "react";

import type { useTheme } from "@/shared/hooks/use-theme";

export type ThemeContextValue = ReturnType<typeof useTheme>;

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};
