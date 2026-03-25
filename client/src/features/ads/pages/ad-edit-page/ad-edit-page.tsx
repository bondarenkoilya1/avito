import { type JSX } from "react";
import { Alert, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import { AdEditForm } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form";
import { useGetAd } from "@/features/ads/hooks";
import {
  DESCRIPTION_GENERATION_INSTRUCTION,
  DESCRIPTION_IMPROVEMENT_INSTRUCTION,
  PRICE_INSTRUCTION
} from "@/features/ai/constants";
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
  if (isError || !ad || Number.isNaN(adId))
    return (
      <Alert
        type="error"
        title="Ошибка"
        description={errorMessage || "Объявление не найдено"}
        showIcon
      />
    );

  const handleGeneratePrice = async (): Promise<string> => {
    if (!activeModel) throw new Error("Модель недоступна");
    const prompt = `${PRICE_INSTRUCTION}\n\nТовар: ${ad.title}, Категория: ${ad.category}, Параметры: ${JSON.stringify(ad.params)}\n\nОТВЕТЬ НА РУССКОМ.`;
    return mutateAsync({ model: activeModel, prompt });
  };

  const handleGenerateDescription = async (currentDescription: string): Promise<string> => {
    if (!activeModel) throw new Error("Модель недоступна");
    const hasText = currentDescription.trim().length > 0;
    const instruction = hasText
      ? DESCRIPTION_IMPROVEMENT_INSTRUCTION
      : DESCRIPTION_GENERATION_INSTRUCTION;

    const context = `Товар: ${ad.title}, Характеристики: ${JSON.stringify(ad.params)}${hasText ? `\nТекущий текст для улучшения: ${currentDescription}` : ""}`;
    const prompt = `${instruction}\n\n${context}\n\nВАЖНО: Пиши на русском языке.`;

    return mutateAsync({ model: activeModel, prompt });
  };

  return (
    <Container maxWidth={942}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Редактирование объявления
      </Title>
      <AdEditForm
        adId={adId}
        initialValues={ad}
        onGeneratePrice={isModelsLoading ? undefined : handleGeneratePrice}
        onGenerateDescription={isModelsLoading ? undefined : handleGenerateDescription}
      />
    </Container>
  );
};
