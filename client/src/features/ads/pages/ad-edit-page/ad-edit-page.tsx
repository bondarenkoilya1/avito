import { type JSX } from "react";
import { Alert, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";
import { useGetAd } from "@/features/ads/hooks";
import { PRICE_INSTRUCTION } from "@/features/ai/constants";
import { useGenerateResponse, useGetModels } from "@/features/ai/hooks";

import { Container } from "@/shared/ui";

const { Title } = Typography;

export const AdEditPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const adId = Number(id);

  const { ad, isLoading: isAdLoading, isError, errorMessage } = useGetAd(adId);
  const { weakestModel, middleModel, strongestModel, isLoading: isModelsLoading } = useGetModels();

  const { mutateAsync } = useGenerateResponse();

  const activeModel = middleModel || weakestModel || strongestModel;

  if (isAdLoading) return <Spin size="large" fullscreen />;

  if (isError || !ad || Number.isNaN(adId)) {
    return (
      <Alert
        type="error"
        title="Ошибка"
        description={errorMessage || "Объявление не найдено"}
        showIcon
      />
    );
  }

  const handleGeneratePrice = async (): Promise<string> => {
    if (!activeModel) {
      throw new Error("Модели ИИ еще загружаются или недоступны");
    }

    const priceRequestData = `Товар: ${ad.title}, категория: ${ad.category}. Подробности: ${JSON.stringify(
      ad.params
    )}.${ad.description ? ` Описание: ${ad.description}` : ""}`;

    const prompt = `${PRICE_INSTRUCTION}. Твоя задача сгенерировать цену для следующего товара: ${priceRequestData}`;

    return mutateAsync({ model: activeModel, prompt });
  };

  return (
    <Container maxWidth={942}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Редактирование объявления #{adId}
      </Title>

      <AdEditForm
        adId={adId}
        initialValues={ad}
        onGeneratePrice={isModelsLoading ? undefined : handleGeneratePrice}
      />
    </Container>
  );
};
