import { message } from "antd";
import type { AxiosError } from "axios";

import { generateResponse } from "@/features/ai/api";
import type {
  GenerateRequestType,
  GenerateResponseType,
  SimplifiedGenerateResponseType
} from "@/features/ai/types";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";

type UseGenerateResponseReturnType = UseMutationResult<
  SimplifiedGenerateResponseType,
  AxiosError<GenerateResponseType>,
  GenerateRequestType
>;

export const useGenerateResponse = (
  onSuccess?: (data: SimplifiedGenerateResponseType) => void
): UseGenerateResponseReturnType => {
  return useMutation({
    mutationFn: (payload: GenerateRequestType) => generateResponse(payload),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: () => {
      void message.error("Произошла ошибка при генерации");
    }
  });
};
