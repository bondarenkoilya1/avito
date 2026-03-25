import { type JSX } from "react";

import { ParamsFieldsList } from "@/features/ads/components";
import { REAL_ESTATE_TYPE_OPTIONS } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form.constants";
import type { FieldConfig } from "@/features/ads/types";

const FIELDS: FieldConfig[] = [
  {
    type: "select",
    name: ["params", "type"],
    label: "Тип",
    options: REAL_ESTATE_TYPE_OPTIONS
  },
  { type: "input", name: ["params", "address"], label: "Адрес" },
  {
    type: "input",
    name: ["params", "area"],
    label: "Площадь (м²)",
    inputType: "number"
  },
  {
    type: "input",
    name: ["params", "floor"],
    label: "Этаж",
    inputType: "number"
  }
];

export const RealEstateFields = (): JSX.Element => <ParamsFieldsList fields={FIELDS} />;
