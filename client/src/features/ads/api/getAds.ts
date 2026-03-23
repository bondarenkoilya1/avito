import { DEFAULT_ADS_SORT } from "@/features/ads/components";
import type { AdsResponse, AdsSortValue } from "@/features/ads/types";
import type { GetAdsParams } from "@/features/ads/types/api.types";

import { api } from "@/shared/api";

const SORT_MAP: Record<AdsSortValue, { sortColumn: string; sortDirection: string }> = {
  title_asc: { sortColumn: "title", sortDirection: "asc" },
  title_desc: { sortColumn: "title", sortDirection: "desc" },
  created_at_asc: { sortColumn: "createdAt", sortDirection: "asc" },
  created_at_desc: { sortColumn: "createdAt", sortDirection: "desc" },
  price_asc: { sortColumn: "price", sortDirection: "asc" },
  price_desc: { sortColumn: "price", sortDirection: "desc" }
};

export const getAds = async (params: GetAdsParams): Promise<AdsResponse> => {
  const ads = await api.get<AdsResponse>("/items", {
    params: {
      q: params.q,
      limit: params.pageSize,
      skip: (params.page - 1) * params.pageSize,
      ...(params.categories?.length && { categories: params.categories.join(",") }),
      ...(params.needsRevision && { needsRevision: true }),
      ...SORT_MAP[params.sort ?? DEFAULT_ADS_SORT]
    }
  });

  return ads.data;
};
