import type { AdCategory } from "@/features/ads/components/ad-card";

export type FilterCategory = AdCategory;

type FilterCategoryOption = {
  label: string;
  value: FilterCategory;
};

// todo: temporarily until api integration
export const FILTER_CATEGORIES: FilterCategoryOption[] = [
  { label: "Авто", value: "auto" },
  { label: "Электроника", value: "electronics" },
  { label: "Недвижимость", value: "real_estate" }
];
