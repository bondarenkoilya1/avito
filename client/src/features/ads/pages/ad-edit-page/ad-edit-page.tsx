import { type JSX } from "react";
import { Alert, Flex, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import { ThemeToggle } from "@/widgets";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";
import { useGetAd } from "@/features/ads/hooks";

import css from "./ad-edit-page.module.css";

const { Title } = Typography;

export const AdEditPage = (): JSX.Element => {
  const { id } = useParams();
  const adId = Number(id);

  const { ad, isLoading, isError, errorMessage } = useGetAd(adId);

  if (isLoading) return <Spin size="large" fullscreen />;

  if (isError || !ad) {
    return (
      <Alert
        type="error"
        title="Ошибка"
        description={errorMessage || "Объявление не найдено"}
        showIcon
      />
    );
  }

  return (
    <div className={css.page}>
      <div className={css.container}>
        <Flex justify="space-between" align="center">
          <Title level={3} className={css.title}>
            Редактирование объявления #{adId}
          </Title>
          <ThemeToggle />
        </Flex>
        <AdEditForm initialValues={ad} />
      </div>
    </div>
  );
};
