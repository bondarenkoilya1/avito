import { getAds } from "@/features/ads/api";
import type { AdsResponse } from "@/features/ads/types";
import type { GetAdsParams } from "@/features/ads/types/api.types";

import { useQuery } from "@tanstack/react-query";

type UseGetAdsReturnType = AdsResponse & {
  isLoading: boolean;
};

export const useGetAds = (params: GetAdsParams): UseGetAdsReturnType => {
  const { data, isLoading } = useQuery({
    queryKey: ["ads", params],
    queryFn: () => getAds(params)
  });

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading
  };
};
