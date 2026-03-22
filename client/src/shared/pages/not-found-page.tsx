import { Button, Col, Result, Row, Space, Typography } from "antd";
import type { JSX } from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  return (
    <Row align="middle" justify="center" style={{ minHeight: "100dvh", gap: 48 }}>
      <Col>
        <Space orientation="vertical" size="small">
          <Typography.Title level={1} style={{ margin: 0 }}>
            Такой страницы не существует
          </Typography.Title>
          <Typography.Paragraph>
            Одно из двух: или кто-то её удалил, или в ссылке опечатка.
          </Typography.Paragraph>
          <Link to="/">
            <Button type="primary" size="large">
              На главную
            </Button>
          </Link>
        </Space>
      </Col>
      <Col>
        <Result status="404" />
      </Col>
    </Row>
  );
};
