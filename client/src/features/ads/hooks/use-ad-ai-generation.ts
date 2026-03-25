import type { AdType } from "@/features/ads/types";
import {
  DESCRIPTION_GENERATION_INSTRUCTION,
  DESCRIPTION_IMPROVEMENT_INSTRUCTION,
  PRICE_INSTRUCTION
} from "@/features/ai/constants";
import { useGenerateResponse, useGetModels } from "@/features/ai/hooks";

type UseAdAiGenerationReturnType = {
  isAiReady: boolean;
  generatePrice: () => Promise<string>;
  generateDescription: (currentDescription: string) => Promise<string>;
};

export const useAdAiGeneration = (ad?: AdType): UseAdAiGenerationReturnType => {
  const { weakestModel, middleModel, strongestModel, isLoading } = useGetModels();
  const { mutateAsync } = useGenerateResponse();

  const activeModel = middleModel || weakestModel || strongestModel;
  const isAiReady = !isLoading && !!activeModel;

  const generatePrice = async (): Promise<string> => {
    if (!activeModel || !ad) throw new Error("Модель недоступна");

    const prompt = `${PRICE_INSTRUCTION}\n\nТовар: ${ad.title}, Категория: ${ad.category}, Параметры: ${JSON.stringify(ad.params)}\n\nОТВЕТЬ НА РУССКОМ.`;
    return mutateAsync({ model: activeModel, prompt });
  };

  const generateDescription = async (currentDescription: string): Promise<string> => {
    if (!activeModel || !ad) throw new Error("Модель недоступна");

    const hasText = currentDescription.trim().length > 0;
    const instruction = hasText
      ? DESCRIPTION_IMPROVEMENT_INSTRUCTION
      : DESCRIPTION_GENERATION_INSTRUCTION;

    const context = `Товар: ${ad.title}, Характеристики: ${JSON.stringify(ad.params)}${hasText ? `\nТекущий текст для улучшения: ${currentDescription}` : ""}`;
    const prompt = `${instruction}\n\n${context}\n\nВАЖНО: Пиши на русском языке.`;

    return mutateAsync({ model: activeModel, prompt });
  };

  return { isAiReady, generatePrice, generateDescription };
};
