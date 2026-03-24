import { useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

const getSavedTheme = (): Theme => (localStorage.getItem(STORAGE_KEY) as Theme) ?? "light";

type UseThemeReturnType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useTheme = (): UseThemeReturnType => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  const toggleTheme = (): void => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  return { theme, toggleTheme };
};
