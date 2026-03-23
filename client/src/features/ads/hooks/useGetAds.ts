import type { AdCardProps } from "@/features/ads/components";

import { api } from "@/shared/api";

import { useQuery } from "@tanstack/react-query";

type AdsType = {
  items: AdCardProps[];
  total: number;
};

const getAds = async (): Promise<AdsType> => {
  const ads = await api.get("/items");
  return ads.data;
};

export const useGetAds = (): AdsType => {
  const { data } = useQuery({
    queryKey: ["ads"],
    queryFn: getAds
  });

  const ads = data?.items || [];
  const totalAds = data?.total || 0;

  return {
    items: ads,
    total: totalAds
  };
};
