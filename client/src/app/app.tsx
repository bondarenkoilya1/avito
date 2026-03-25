import { type JSX, useEffect } from "react";
import { App as AntdApp, Flex, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

import { ThemeToggle } from "@/widgets";

import { Container } from "@/shared/ui";

const { Header, Content } = Layout;

export const App = (): JSX.Element => {
  const { token } = theme.useToken();

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgLayout;
  }, [token.colorBgLayout]);

  return (
    <AntdApp>
      <Layout style={{ minHeight: "100vh", background: "transparent" }}>
        <Header style={{ background: "transparent", padding: "16px 0", height: "auto" }}>
          <Container>
            <Flex justify="flex-end" align="center">
              <ThemeToggle />
            </Flex>
          </Container>
        </Header>

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </AntdApp>
  );
};
