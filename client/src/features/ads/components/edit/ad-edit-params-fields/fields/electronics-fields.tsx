import { type JSX } from "react";

import { ParamsFieldsList } from "@/features/ads/components";
import {
  ELECTRONICS_CONDITION_OPTIONS,
  ELECTRONICS_TYPE_OPTIONS
} from "@/features/ads/pages/ad-edit-page";
import type { FieldConfig } from "@/features/ads/types";

const FIELDS: FieldConfig[] = [
  {
    type: "select",
    name: ["params", "type"],
    label: "Тип",
    options: ELECTRONICS_TYPE_OPTIONS
  },
  { type: "input", name: ["params", "brand"], label: "Бренд" },
  { type: "input", name: ["params", "model"], label: "Модель" },
  { type: "input", name: ["params", "color"], label: "Цвет" },
  {
    type: "select",
    name: ["params", "condition"],
    label: "Состояние",
    options: ELECTRONICS_CONDITION_OPTIONS
  }
];

export const ElectronicsFields = (): JSX.Element => <ParamsFieldsList fields={FIELDS} />;
