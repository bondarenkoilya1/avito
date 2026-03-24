import { Typography } from "antd";
import type { JSX } from "react";

import css from "./ad-description.module.css";

type AdDescriptionProps = {
  description?: string;
};

export const AdDescription = ({ description }: AdDescriptionProps): JSX.Element | null => {
  if (!description) {
    return null;
  }

  return (
    <div className={css.description}>
      <Typography.Title level={5} className={css.sectionTitle}>
        Описание
      </Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </div>
  );
};
