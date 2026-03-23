import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DEFAULT_ADS_SORT } from "@/features/ads/components";
import { useGetAds } from "@/features/ads/hooks/useGetAds";
import type { AdCardType, AdCategory, AdsSortValue } from "@/features/ads/types";

type UseAdsFiltersReturnType = {
  items: AdCardType[];
  total: number;
  isLoading: boolean;
  page: number;
  searchValue: string;
  categories: AdCategory[];
  needsRevision: boolean;
  sortValue: AdsSortValue;
  setPage: (page: number) => void;
  search: (value: string) => void;
  changeCategories: (values: AdCategory[]) => void;
  changeNeedsRevision: () => void;
  resetSearch: () => void;
  sort: (value: AdsSortValue) => void;
};

export const useAdsFilters = (pageSize: number): UseAdsFiltersReturnType => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const searchValue = searchParams.get("q") ?? "";
  const categories = (searchParams.get("categories")?.split(",") ?? []) as AdCategory[];
  const needsRevision = searchParams.get("needsRevision") === "true";
  const sortValue = (searchParams.get("sort") ?? DEFAULT_ADS_SORT) as AdsSortValue;

  const { items, total, isLoading } = useGetAds({
    q: searchValue,
    page,
    pageSize,
    categories,
    needsRevision,
    sort: sortValue
  });

  const setPage = (newPage: number): void =>
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      return prev;
    });

  const search = (value: string): void => {
    setSearchParams((prev) => {
      prev.set("q", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const changeCategories = (values: AdCategory[]): void =>
    setSearchParams((prev) => {
      if (values.length) {
        prev.set("categories", values.join(","));
      } else {
        prev.delete("categories");
      }
      prev.set("page", "1");
      return prev;
    });

  const changeNeedsRevision = (): void =>
    setSearchParams((prev) => {
      if (needsRevision) {
        prev.delete("needsRevision");
      } else {
        prev.set("needsRevision", "true");
      }
      prev.set("page", "1");
      return prev;
    });

  const resetSearch = (): void =>
    setSearchParams((prev) => {
      prev.delete("categories");
      prev.delete("needsRevision");
      prev.set("page", "1");
      return prev;
    });

  const sort = (value: AdsSortValue): void =>
    setSearchParams((prev) => {
      prev.set("sort", value);
      prev.set("page", "1");
      return prev;
    });

  useEffect(
    () => {
      if (!isLoading && items.length === 0 && page > 1) {
        setPage(1);
      }
    }, // eslint-disable-next-line
    [isLoading, items.length, page]
  );

  return {
    items,
    total,
    isLoading,
    page,
    searchValue,
    categories,
    needsRevision,
    sortValue,
    setPage,
    search,
    changeCategories,
    changeNeedsRevision,
    resetSearch,
    sort
  };
};
