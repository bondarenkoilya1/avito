import { App } from "antd";
import type { AxiosError } from "axios";

import { type ApiErrorResponse, getApiErrorMessage } from "@/shared/api";

import { type AdUpdateType } from "../types";

import { replaceAd, type UpdateAdResponseType } from "../api/replace-ad";

import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";

export const useUpdateAd = (
  id: number
): UseMutationResult<UpdateAdResponseType, AxiosError<ApiErrorResponse>, AdUpdateType> => {
  const queryClient = useQueryClient();

  const { message } = App.useApp();

  return useMutation<UpdateAdResponseType, AxiosError<ApiErrorResponse>, AdUpdateType>({
    mutationFn: (data: AdUpdateType) => replaceAd(id, data),

    onSuccess: (data) => {
      if (data.success) {
        void message.success("Объявление успешно обновлено");
        void queryClient.invalidateQueries({ queryKey: ["ad", id] });
        void queryClient.invalidateQueries({ queryKey: ["ads"] });
      }
    },

    onError: (error) => {
      void message.error(getApiErrorMessage(error));
    }
  });
};
