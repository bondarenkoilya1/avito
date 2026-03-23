import type { SelectProps } from "antd";

import type { AdsSortValue } from "@/features/ads/types";
export type { AdsSortValue } from "@/features/ads/types";

export const DEFAULT_ADS_SORT: AdsSortValue = "created_at_desc";

export const ADS_SORT_OPTIONS: SelectProps<AdsSortValue>["options"] = [
  {
    label: "По названию",
    options: [
      { value: "title_asc", label: "А -> Я" },
      { value: "title_desc", label: "Я -> А" }
    ]
  },
  {
    label: "По новизне",
    options: [
      { value: "created_at_desc", label: "Сначала новые" },
      { value: "created_at_asc", label: "Сначала старые" }
    ]
  },
  {
    label: "По цене",
    options: [
      { value: "price_asc", label: "Сначала дешевле" },
      { value: "price_desc", label: "Сначала дороже" }
    ]
  }
];
