import type { AdCategory } from "@/features/ads/types";

export type FilterCategoryOption = {
  label: string;
  value: AdCategory;
};

// todo: temporarily until api integration
export const FILTER_CATEGORIES: FilterCategoryOption[] = [
  { label: "Авто", value: "auto" },
  { label: "Электроника", value: "electronics" },
  { label: "Недвижимость", value: "real_estate" }
];
