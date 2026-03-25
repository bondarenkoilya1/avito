import type { AxiosError } from "axios";

export type ApiErrorResponse = {
  error?: string | Record<string, string[]>;
  message?: string;
};

export const getApiErrorMessage = (
  error: AxiosError<ApiErrorResponse>,
  fallback = "Произошла сетевая ошибка"
): string => {
  const serverError = error.response?.data?.error;

  if (typeof serverError === "string") {
    return serverError;
  }

  if (serverError && typeof serverError === "object") {
    return "Ошибка валидации полей";
  }

  const message = error.response?.data?.message;
  if (typeof message === "string") {
    return message;
  }

  return fallback;
};
