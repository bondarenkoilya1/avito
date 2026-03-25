import type {
  GenerateRequestType,
  GenerateResponseType,
  SimplifiedGenerateResponseType
} from "@/features/ai/types";

import { apiOllama } from "@/shared/api";

const AI_TEMPERATURE = 0.1;
const AI_MAX_TOKENS = 300;

export const generateResponse = async (
  payload: GenerateRequestType,
  signal?: AbortSignal
): Promise<SimplifiedGenerateResponseType> => {
  const { data } = await apiOllama.post<GenerateResponseType>(
    "/generate",
    {
      model: payload.model,
      prompt: payload.prompt,
      stream: false,
      options: {
        temperature: AI_TEMPERATURE,
        num_predict: AI_MAX_TOKENS
      }
    },
    { signal }
  );

  return data.response;
};
