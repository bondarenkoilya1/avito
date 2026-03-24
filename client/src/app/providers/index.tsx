import { type JSX } from "react";
import { ConfigProvider, theme } from "antd";

import { QueryProvider } from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { Router } from "@/app/router";

import { useThemeContext } from "@/shared/contexts";

const ThemedApp = (): JSX.Element => {
  const { theme: currentTheme } = useThemeContext();

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}>
      <Router />
    </ConfigProvider>
  );
};

export const Providers = (): JSX.Element => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </QueryProvider>
  );
};
