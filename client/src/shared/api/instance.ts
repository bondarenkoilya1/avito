import axios from "axios";

import { API_URL, OLLAMA_API_URL } from "@/shared/config";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

export const apiOllama = axios.create({
  baseURL: OLLAMA_API_URL,
  headers: { "Content-Type": "application/json" }
});

const errorHandler = (error: unknown): Promise<unknown> => {
  console.error(`API Error: ${error || "Cannot get error message."}`);
  return Promise.reject(error);
};

api.interceptors.response.use((r) => r, errorHandler);
apiOllama.interceptors.response.use((r) => r, errorHandler);
