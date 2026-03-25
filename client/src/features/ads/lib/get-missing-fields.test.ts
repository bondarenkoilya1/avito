import { describe, expect, it } from "vitest";

import type { AdResponse } from "@/features/ads/api/get-ad";

import { getMissingFields } from "./get-missing-fields";

const baseAd = {
  id: 1,
  title: "Тест",
  price: 1000,
  description: "Описание",
  createdAt: "2024-01-01T00:00:00",
  updatedAt: "2024-01-01T00:00:00",
  needsRevision: false
} as const;

describe("getMissingFields", () => {
  it("возвращает пустой массив если всё заполнено", () => {
    const ad: AdResponse = {
      ...baseAd,
      category: "auto",
      params: {
        brand: "Toyota",
        model: "Camry",
        yearOfManufacture: 2020,
        transmission: "automatic",
        mileage: 50000,
        enginePower: 150
      }
    };

    expect(getMissingFields(ad)).toEqual([]);
  });

  it("добавляет «Описание» первым если description отсутствует", () => {
    const ad: AdResponse = {
      ...baseAd,
      description: undefined,
      category: "auto",
      params: { brand: "Toyota" }
    };

    const result = getMissingFields(ad);
    expect(result[0]).toBe("Описание");
  });

  it.each([
    [{ ...baseAd, category: "auto", params: { model: undefined } } as AdResponse, "Модель"],
    [{ ...baseAd, category: "real_estate", params: { address: undefined } } as AdResponse, "Адрес"],
    [
      { ...baseAd, category: "electronics", params: { condition: undefined } } as AdResponse,
      "Состояние"
    ]
  ])("возвращает лейбл пропущенного поля (%s)", (ad, expectedLabel) => {
    expect(getMissingFields(ad)).toContain(expectedLabel);
  });

  it("не дублирует поля", () => {
    const ad: AdResponse = {
      ...baseAd,
      category: "auto",
      params: { brand: undefined }
    };

    const result = getMissingFields(ad);
    expect(result.filter((f) => f === "Бренд")).toHaveLength(1);
  });

  it("использует имя ключа если его нет в FIELD_LABELS", () => {
    const ad = {
      ...baseAd,
      category: "auto",
      params: { unknownField: undefined }
    };

    expect(getMissingFields(ad as AdResponse)).toContain("unknownField");
  });
});
