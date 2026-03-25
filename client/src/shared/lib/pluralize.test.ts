import { describe, expect, it } from "vitest";

import type { PluralizeVariants } from "./pluralize";
import { pluralize } from "./pluralize";

const RU_VARIANTS: PluralizeVariants = {
  one: "объявление",
  few: "объявления",
  many: "объявлений"
};

describe("pluralize", () => {
  describe("Русская локаль", () => {
    it.each([
      [1, "one", "объявление"],
      [21, "one", "объявление"],
      [31, "one", "объявление"],
      [2, "few", "объявления"],
      [4, "few", "объявления"],
      [22, "few", "объявления"],
      [0, "many", "объявлений"],
      [5, "many", "объявлений"],
      [11, "many", "объявлений"],
      [20, "many", "объявлений"],
      [100, "many", "объявлений"]
    ])("число %i → правило «%s» → «%s»", (number, _rule, expected) => {
      expect(pluralize(RU_VARIANTS, number)).toBe(expected);
    });
  });

  describe("граничные случаи", () => {
    it.each([
      [5, { one: "объявление" }, undefined, "вариант для «many» отсутствует"],
      [1, {}, undefined, "пустой объект вариантов"],
      [-1, RU_VARIANTS, "объявление", "отрицательное число → «one»"],
      [-5, RU_VARIANTS, "объявлений", "отрицательное число → «many»"]
    ])("%i, %s → ожидаем «%s» (%s)", (number, variants, expected, _description) => {
      expect(pluralize(variants, number)).toBe(expected);
    });
  });
});
