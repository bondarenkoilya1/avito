import type {
  GenerateRequestType,
  GenerateResponseType,
  SimplifiedGenerateResponseType
} from "@/features/ai/types";

import { apiOllama } from "@/shared/api";

export const generateResponse = async (
  payload: GenerateRequestType
): Promise<SimplifiedGenerateResponseType> => {
  const { data } = await apiOllama.post<GenerateResponseType>("/generate", {
    model: payload.model,
    prompt: payload.prompt,
    stream: false,
    options: {
      temperature: 0.1,
      num_predict: 300
    }
  });

  return data.response;
};
