import { api } from "@/features/ai/api";
import type {
  GenerateRequestType,
  GenerateResponseType,
  SimplifiedGenerateResponseType
} from "@/features/ai/types";

export const generateResponse = async (
  payload: GenerateRequestType
): Promise<SimplifiedGenerateResponseType> => {
  const { data } = await api.post<GenerateResponseType>("/generate", {
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
