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
    ...payload,
    stream: false
  });

  return data.response;
};
