import { Button, Flex, Typography } from "antd";
import type { JSX } from "react";
import { Link } from "react-router-dom";

import css from "./ad-details-header.module.css";

import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";

type AdDetailsHeaderProps = {
  adId: number;
  title: string;
  priceLabel: string | null;
  createdAtLabel: string;
  updatedAtLabel: string;
  onEdit: (id: number) => void;
};

export const AdDetailsHeader = ({
  adId,
  title,
  priceLabel,
  createdAtLabel,
  updatedAtLabel,
  onEdit
}: AdDetailsHeaderProps): JSX.Element => {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Link to="/ads">
          <Button type="link" icon={<ArrowLeftOutlined />}>
            К списку объявлений
          </Button>
        </Link>
      </Flex>

      <Flex justify="space-between" align="flex-start" className={css.header}>
        <Flex vertical gap={8}>
          <Typography.Title level={2} className={css.title}>
            {title}
          </Typography.Title>
          <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(adId)}>
            Редактировать
          </Button>
        </Flex>

        <Flex vertical align="flex-end" gap={4}>
          {priceLabel && (
            <Typography.Title level={3} className={css.price}>
              {priceLabel}
            </Typography.Title>
          )}
          <Typography.Text type="secondary" className={css.date}>
            Опубликовано: {createdAtLabel}
          </Typography.Text>
          <Typography.Text type="secondary" className={css.date}>
            Отредактировано: {updatedAtLabel}
          </Typography.Text>
        </Flex>
      </Flex>
    </>
  );
};
