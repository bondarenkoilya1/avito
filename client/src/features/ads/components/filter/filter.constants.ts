import { getCategoryLabel } from "@/features/ads/constants";
import type { AdCategory } from "@/features/ads/types";

export type FilterCategoryOption = {
  label: string;
  value: AdCategory;
};

const FILTER_CATEGORY_ORDER: AdCategory[] = ["auto", "electronics", "real_estate"];

export const FILTER_CATEGORIES: FilterCategoryOption[] = FILTER_CATEGORY_ORDER.map((category) => ({
  label: getCategoryLabel(category),
  value: category
}));
