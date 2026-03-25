import { describe, expect, it } from "vitest";

import { formatPrice } from "./format-price";

const NB = "\u00A0"; // non-breaking space, именно его использует Intl.NumberFormat ru-RU

describe("formatPrice", () => {
  it.each([
    [0, `0 ₽`],
    [1, `1 ₽`],
    [999, `999 ₽`],
    [1_000, `1${NB}000 ₽`],
    [9_999, `9${NB}999 ₽`],
    [10_000, `10${NB}000 ₽`],
    [999_999, `999${NB}999 ₽`],
    [1_000_000, `1${NB}000${NB}000 ₽`]
  ])("formatPrice(%i) → «%s»", (price, expected) => {
    expect(formatPrice(price)).toBe(expected);
  });

  describe("граничные случаи", () => {
    it.each([
      [-1, `-1 ₽`, "отрицательное число"],
      [-1_000, `-1${NB}000 ₽`, "отрицательное с разрядом"],
      [1.5, `1,5 ₽`, "дробное число"],
      [1_000.99, `1${NB}000,99 ₽`, "дробное с разрядом"],
      [
        Number.MAX_SAFE_INTEGER,
        `${new Intl.NumberFormat("ru-RU").format(Number.MAX_SAFE_INTEGER)} ₽`,
        "MAX_SAFE_INTEGER"
      ]
    ])("formatPrice(%i) → «%s» (%s)", (price, expected, _description) => {
      expect(formatPrice(price)).toBe(expected);
    });
  });
});
