import { describe, expect, it } from "vitest";

import { formatDate } from "./format-date";

describe("formatDate", () => {
  it.each([
    "2026-01-05T10:30:00",
    "2026-03-21T09:05:00",
    "2026-12-31T23:59:00",
    "2026-07-01T00:00:00"
  ])("возвращает строку с днём, месяцем, часами и минутами для «%s»", (iso) => {
    expect(formatDate(iso)).toMatch(/\d{1,2} \S+ .* \d{2}:\d{2}/);
  });

  it("возвращает строку для невалидной даты", () => {
    expect(typeof formatDate("not-a-date")).toBe("string");
  });
});
