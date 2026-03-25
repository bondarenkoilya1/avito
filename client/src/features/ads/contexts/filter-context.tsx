import { createContext, type ReactNode, useContext, useState, type JSX } from "react";

import { useAdsFilters } from "@/features/ads/hooks/use-ads-filters";
import type { AdCategory, AdsSortValue } from "@/features/ads/types";
import type { AdCardType } from "@/features/ads/types/ad.types";

import type { ViewMode } from "@/features/ads/components/list/toolbar/toolbar";
import { PAGE_SIZE } from "@/features/ads/constants";

type FilterContextType = {
  items: AdCardType[];
  total: number;
  isLoading: boolean;
  page: number;
  searchValue: string;
  categories: AdCategory[];
  needsRevision: boolean;
  sortValue: AdsSortValue;
  viewMode: ViewMode;
  setPage: (page: number) => void;
  search: (value: string) => void;
  changeCategories: (values: AdCategory[]) => void;
  changeNeedsRevision: () => void;
  resetSearch: () => void;
  sort: (value: AdsSortValue) => void;
  setViewMode: (mode: ViewMode) => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const filters = useAdsFilters(PAGE_SIZE);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <FilterContext.Provider value={{ ...filters, viewMode, setViewMode }}>
      {children}
    </FilterContext.Provider>
  );
};
