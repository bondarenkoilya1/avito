import { type JSX } from "react";

import { ParamsFieldsList } from "@/features/ads/components";
import { AUTO_TRANSMISSION_OPTIONS } from "@/features/ads/components/edit/ad-edit-form/ad-edit-form.constants";
import type { FieldConfig } from "@/features/ads/types";

const FIELDS: FieldConfig[] = [
  { type: "input", name: ["params", "brand"], label: "Бренд" },
  { type: "input", name: ["params", "model"], label: "Модель" },
  {
    type: "input",
    name: ["params", "yearOfManufacture"],
    label: "Год выпуска",
    inputType: "number"
  },
  {
    type: "select",
    name: ["params", "transmission"],
    label: "Коробка передач",
    options: AUTO_TRANSMISSION_OPTIONS
  },
  {
    type: "input",
    name: ["params", "mileage"],
    label: "Пробег (км)",
    inputType: "number"
  },
  {
    type: "input",
    name: ["params", "enginePower"],
    label: "Мощность двигателя (л.с.)",
    inputType: "number"
  }
];

export const AutoFields = (): JSX.Element => <ParamsFieldsList fields={FIELDS} />;
