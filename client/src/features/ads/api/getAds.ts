import type { AdsResponse } from "@/features/ads/types";
import type { GetAdsParams } from "@/features/ads/types/api.types";

import { api } from "@/shared/api";

export const getAds = async (params: GetAdsParams): Promise<AdsResponse> => {
  const ads = await api.get<AdsResponse>("/items", {
    params: {
      limit: params.pageSize,
      skip: (params.page - 1) * params.pageSize,
      ...(params.categories?.length && { categories: params.categories.join(",") }),
      ...(params.needsRevision && { needRevision: true })
    }
  });

  return ads.data;
};
