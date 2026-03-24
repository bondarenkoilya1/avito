import { type JSX } from "react";
import { Flex, Typography } from "antd";

import { ThemeToggle } from "@/widgets";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";

import css from "./ad-edit-page.module.css";

const { Title } = Typography;

export const AdEditPage = (): JSX.Element => {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <Flex justify="space-between" align="center">
          <Title level={3} className={css.title}>
            Редактирование объявления
          </Title>
          <ThemeToggle />
        </Flex>
        <AdEditForm />
      </div>
    </div>
  );
};
