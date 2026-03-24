import { type JSX } from "react";

import { ParamsFieldsList } from "@/features/ads/components";
import { REAL_ESTATE_TYPE_OPTIONS } from "@/features/ads/pages/ad-edit-page";
import type { FieldConfig } from "@/features/ads/types";

const FIELDS: FieldConfig[] = [
  { type: "select", name: "type", label: "Тип", options: REAL_ESTATE_TYPE_OPTIONS },
  { type: "input", name: "address", label: "Адрес" },
  { type: "input", name: "area", label: "Площадь (м²)", inputType: "number" },
  { type: "input", name: "floor", label: "Этаж", inputType: "number" }
];

export const RealEstateFields = (): JSX.Element => <ParamsFieldsList fields={FIELDS} />;
