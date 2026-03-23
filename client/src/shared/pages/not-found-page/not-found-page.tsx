import { Button, Col, Result, Row, Space, Typography } from "antd";
import type { JSX } from "react";
import { Link } from "react-router-dom";

import css from "./not-found-page.module.css";

export const NotFoundPage = (): JSX.Element => {
  return (
    <Row align="middle" justify="center" className={css.wrapper}>
      <Col>
        <Space orientation="vertical" size="small">
          <Typography.Title level={1} className={css.title}>
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
