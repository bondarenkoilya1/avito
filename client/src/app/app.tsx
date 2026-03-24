import { type JSX } from "react";
import { useEffect } from "react";
import { theme } from "antd";
import { Outlet } from "react-router-dom";

export const App = (): JSX.Element => {
  const { token } = theme.useToken();

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgLayout;
  }, [token.colorBgLayout]);

  return <Outlet />;
};
