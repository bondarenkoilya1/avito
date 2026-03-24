import { generateResponse } from "@/features/ai/api";
import type { GenerateRequestType, SimplifiedGenerateResponseType } from "@/features/ai/types";

import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

type UseGenerateResponseReturnType = UseMutationResult<
  SimplifiedGenerateResponseType,
  Error,
  GenerateRequestType
>;

export const useGenerateResponse = (): UseGenerateResponseReturnType => {
  return useMutation({
    mutationFn: generateResponse,
    onError: (error) => {
      console.error("Ошибка при запросе к LLM:", error.message);
    }
  });
};
