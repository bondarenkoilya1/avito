import type { AdsSortValue } from "@/features/ads/types/sort.types";

import type { AdCardType, AdCategory } from "./ad.types";

export type AdsResponse = {
  items: AdCardType[];
  total: number;
};

export type GetAdsParams = {
  page: number;
  pageSize: number;
  categories?: AdCategory[];
  needsRevision: boolean;
  q?: string;
  sort: AdsSortValue;
};
