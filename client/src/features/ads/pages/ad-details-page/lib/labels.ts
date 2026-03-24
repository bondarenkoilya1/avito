import type { AdCategory } from "@/features/ads/types";

export const FIELD_LABELS: Record<string, string> = {
  brand: "Бренд",
  model: "Модель",
  color: "Цвет",
  condition: "Состояние",
  type: "Тип",
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
  transmission: "Коробка передач",
  mileage: "Пробег",
  enginePower: "Мощность двигателя",
  yearOfManufacture: "Год выпуска"
};

export const REQUIRED_FIELDS_BY_CATEGORY: Record<AdCategory, string[]> = {
  auto: ["brand", "model", "yearOfManufacture", "transmission", "mileage", "enginePower"],
  real_estate: ["type", "address", "area", "floor"],
  electronics: ["type", "brand", "model", "condition", "color"]
};
