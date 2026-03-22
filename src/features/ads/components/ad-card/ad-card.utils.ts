import type { AdCategory } from "@/features/ads/components/ad-card/ad-card.types";

const CATEGORY_LABELS: Record<AdCategory, string> = {
  auto: "Авто",
  real_estate: "Недвижимость",
  electronics: "Электроника"
};

export const getCategoryLabel = (category: AdCategory): string => CATEGORY_LABELS[category];

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(price);
