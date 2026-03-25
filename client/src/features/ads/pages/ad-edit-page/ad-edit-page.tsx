import { type JSX } from "react";
import { Alert, Typography } from "antd";
import { useParams } from "react-router-dom";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";
import { AdEditFormSkeleton } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form-skeleton";
import { useGetAd } from "@/features/ads/hooks";
import { useAdAiGeneration } from "@/features/ads/hooks/use-ad-ai-generation";

import { Container } from "@/shared/ui";

export const AdEditPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const adId = Number(id);

  const { ad, isLoading, isError, errorMessage } = useGetAd(adId);
  const { isAiReady, generatePrice, generateDescription } = useAdAiGeneration(ad);

  return (
    <Container maxWidth={942}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        Редактирование объявления
      </Typography.Title>

      {isLoading ? (
        <AdEditFormSkeleton />
      ) : isError || !ad || Number.isNaN(adId) ? (
        <Alert
          type="error"
          title="Не удалось загрузить объявление для изменения"
          description={errorMessage || "Объявление не найдено"}
          showIcon
        />
      ) : (
        <AdEditForm
          adId={adId}
          initialValues={ad}
          onGeneratePrice={isAiReady ? generatePrice : undefined}
          onGenerateDescription={isAiReady ? generateDescription : undefined}
        />
      )}
    </Container>
  );
};
