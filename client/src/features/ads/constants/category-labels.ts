import type { AdCategory } from "@/features/ads/types";

export const CATEGORY_LABELS: Record<AdCategory, string> = {
  auto: "Транспорт",
  real_estate: "Недвижимость",
  electronics: "Электроника"
};

export const getCategoryLabel = (category: AdCategory): string => CATEGORY_LABELS[category];
