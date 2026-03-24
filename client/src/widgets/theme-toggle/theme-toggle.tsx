import { type JSX } from "react";
import { Button } from "antd";

import { useThemeContext } from "@/shared/contexts";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const ThemeToggle = (): JSX.Element => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <Button
      type="text"
      icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      style={{ fontSize: 16, border: "1px solid", borderColor: "inherit" }}
    />
  );
};
