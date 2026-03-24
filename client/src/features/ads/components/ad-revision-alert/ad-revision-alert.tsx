import { Alert, Space, Typography } from "antd";
import type { JSX } from "react";

import css from "./ad-revision-alert.module.css";

type AdRevisionAlertProps = {
  isVisible: boolean;
  missingFields: string[];
};

export const AdRevisionAlert = ({
  isVisible,
  missingFields
}: AdRevisionAlertProps): JSX.Element | null => {
  if (!isVisible || missingFields.length === 0) {
    return null;
  }

  return (
    <Alert
      type="warning"
      title="Требуются доработки"
      description={
        <Space orientation="vertical" size={2}>
          <Typography.Text>У объявления не заполнены поля:</Typography.Text>
          <ul className={css.missingList}>
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </Space>
      }
      showIcon
    />
  );
};
