import { type AdResponse, getAd } from "@/features/ads/api";

import { useQuery } from "@tanstack/react-query";

type UseGetAdReturnType = {
  ad: AdResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
};

export const useGetAd = (number: number): UseGetAdReturnType => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ad", number],
    queryFn: ({ signal }) => getAd(number, signal),
    enabled: Number.isFinite(number)
  });

  return {
    ad: data,
    isLoading,
    isError,
    errorMessage: error instanceof Error ? error.message : null
  };
};
