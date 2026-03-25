import type { AdType } from "@/features/ads/types/ad.types";

import { api } from "@/shared/api";

export type AdResponse = AdType & { needsRevision: boolean };

export const getAd = async (id: number): Promise<AdResponse> => {
  const ad = await api.get<AdResponse>(`/items/${id}`);

  return ad.data;
};
