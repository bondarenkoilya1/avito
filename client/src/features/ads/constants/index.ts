import { type PluralizeVariants } from "@/shared/lib";

export * from "./category-labels";

export const ADS_PLURAL_VARIANTS: PluralizeVariants = {
  one: "объявление",
  few: "объявления",
  many: "объявлений",
  other: "объявления"
};

export const PAGE_SIZE = 10;
export const SKELETON_COUNT = 10;
