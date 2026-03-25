import type { InternalAxiosRequestConfig } from "axios";
import axios, { type AxiosError } from "axios";

import { API_URL, OLLAMA_API_URL } from "@/shared/config";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    __retryCount?: number;
  }
}
const API_TIMEOUT = 15_000;
const OLLAMA_TIMEOUT = 60_000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1_000;

const isRetryable = (error: AxiosError): boolean => {
  if (axios.isCancel(error)) return false;
  if (!error.response) return true;
  return error.response.status >= 500;
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const createRetryInterceptor = (maxRetries: number) => {
  return async (error: AxiosError): Promise<unknown> => {
    const config = error.config as InternalAxiosRequestConfig;
    if (!config) return Promise.reject(error);

    const retryCount = config.__retryCount ?? 0;

    if (retryCount >= maxRetries || !isRetryable(error)) {
      return Promise.reject(error);
    }

    config.__retryCount = retryCount + 1;
    await delay(RETRY_DELAY * (retryCount + 1));

    return axios(config);
  };
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: API_TIMEOUT
});

export const apiOllama = axios.create({
  baseURL: OLLAMA_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: OLLAMA_TIMEOUT
});

api.interceptors.response.use((r) => r, createRetryInterceptor(MAX_RETRIES));
apiOllama.interceptors.response.use((r) => r, createRetryInterceptor(0));
