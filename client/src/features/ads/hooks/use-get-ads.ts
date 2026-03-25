import { getAds } from "@/features/ads/api";
import type { AdsResponse } from "@/features/ads/types";
import type { GetAdsParams } from "@/features/ads/types/api.types";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

type UseGetAdsReturnType = AdsResponse & {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};

export const useGetAds = (params: GetAdsParams): UseGetAdsReturnType => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ads", params],
    queryFn: ({ signal }) => getAds(params, signal),
    placeholderData: keepPreviousData
  });

  return {
    items: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    errorMessage: (error as Error)?.message
  };
};
