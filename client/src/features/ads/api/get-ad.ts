import { api } from "@/features/ads/api";
import type { AdType } from "@/features/ads/types/ad.types";

export type AdResponse = AdType & { needsRevision: boolean };

export const getAd = async (id: number): Promise<AdResponse> => {
  const ad = await api.get<AdResponse>(`/items/${id}`);

  return ad.data;
};
