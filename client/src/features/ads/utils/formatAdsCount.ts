import { pluralize, type PluralizeVariants } from "@/shared/lib";

export const formatAdsCount = (variants: PluralizeVariants, number: number): string =>
  number ? `${number} ${pluralize(variants, number)}` : "Объявлений не найдено";
