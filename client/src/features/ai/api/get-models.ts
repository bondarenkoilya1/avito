import type { ModelsType, SimplifiedModelType } from "@/features/ai/types";

import { apiOllama } from "@/shared/api";

export const getModels = async (): Promise<SimplifiedModelType[]> => {
  const models = await apiOllama.get<ModelsType>("/tags");

  return models.data.models
    .map((model) => ({
      name: model.name,
      power: model.details.parameter_size
    }))
    .sort((a, b) => {
      const getNumber = (string: string): number => parseFloat(string.replace(/[^0-9.]/g, "")) || 0;
      return getNumber(a.power) - getNumber(b.power);
    });
};
