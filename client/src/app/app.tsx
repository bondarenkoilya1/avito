import { type JSX, useEffect } from "react";
import { App as AntdApp, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

import { ThemeToggle } from "@/widgets";

const { Content } = Layout;

export const App = (): JSX.Element => {
  const { token } = theme.useToken();

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgLayout;
  }, [token.colorBgLayout]);

  return (
    <AntdApp>
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <div style={{ position: "fixed", top: 20, right: 24, zIndex: 100 }}>
          <ThemeToggle />
        </div>

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </AntdApp>
  );
};
