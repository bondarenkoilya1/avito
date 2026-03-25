import { api } from "@/shared/api";

import { type AdUpdateType } from "../types";

export type UpdateAdResponseType = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export const replaceAd = async (
  id: number,
  payload: AdUpdateType,
  signal?: AbortSignal
): Promise<UpdateAdResponseType> => {
  const response = await api.put<UpdateAdResponseType>(`/items/${id}`, payload, { signal });
  return response.data;
};
