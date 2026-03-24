import { type ReactNode } from "react";
import type { JSX } from "react";

import { ThemeContext } from "@/shared/contexts";
import { useTheme } from "@/shared/hooks/use-theme";

export const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
