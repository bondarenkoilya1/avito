import axios from "axios";

import { OLLAMA_API_URL } from "@/shared/config";

export const api = axios.create({
  baseURL: OLLAMA_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error ${error}`);
    return Promise.reject(error);
  }
);
