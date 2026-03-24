import { type JSX } from "react";
import { Typography } from "antd";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";

import css from "./ad-edit-page.module.css";

const { Title } = Typography;

export const AdEditPage = (): JSX.Element => {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <Title level={3} className={css.title}>
          Редактирование объявления
        </Title>
        <AdEditForm />
      </div>
    </div>
  );
};
