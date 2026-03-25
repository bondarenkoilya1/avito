import { App } from "antd";
import type { AxiosError } from "axios";

import { type AdUpdateType } from "../types";

import { replaceAd, type UpdateAdResponseType } from "../api/replace-ad";

import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";

export const useUpdateAd = (
  id: number
): UseMutationResult<UpdateAdResponseType, AxiosError<UpdateAdResponseType>, AdUpdateType> => {
  const queryClient = useQueryClient();

  const { message } = App.useApp();

  return useMutation<UpdateAdResponseType, AxiosError<UpdateAdResponseType>, AdUpdateType>({
    mutationFn: (data: AdUpdateType) => replaceAd(id, data),

    onSuccess: (data) => {
      if (data.success) {
        void message.success("Объявление успешно обновлено");
        void queryClient.invalidateQueries({ queryKey: ["ad", id] });
        void queryClient.invalidateQueries({ queryKey: ["ads"] });
      }
    },

    onError: (error) => {
      const serverError = error.response?.data?.error;

      if (typeof serverError === "string") {
        void message.error(serverError);
      } else if (serverError && typeof serverError === "object") {
        void message.error("Ошибка валидации полей");
      } else {
        void message.error("Произошла сетевая ошибка");
      }
    }
  });
};
