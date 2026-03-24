import { type JSX } from "react";

import { ParamsFieldsList } from "@/features/ads/components";
import { AUTO_TRANSMISSION_OPTIONS } from "@/features/ads/pages/ad-edit-page";
import type { FieldConfig } from "@/features/ads/types";

const FIELDS: FieldConfig[] = [
  { type: "input", name: "brand", label: "Бренд" },
  { type: "input", name: "model", label: "Модель" },
  { type: "input", name: "yearOfManufacture", label: "Год выпуска", inputType: "number" },
  {
    type: "select",
    name: "transmission",
    label: "Коробка передач",
    options: AUTO_TRANSMISSION_OPTIONS
  },
  { type: "input", name: "mileage", label: "Пробег (км)", inputType: "number" },
  { type: "input", name: "enginePower", label: "Мощность двигателя (л.с.)", inputType: "number" }
];

export const AutoFields = (): JSX.Element => <ParamsFieldsList fields={FIELDS} />;
