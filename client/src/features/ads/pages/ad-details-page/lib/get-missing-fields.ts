import type { AdResponse } from "@/features/ads/api/get-ad";
import {
  FIELD_LABELS,
  REQUIRED_FIELDS_BY_CATEGORY
} from "@/features/ads/pages/ad-details-page/lib/labels";

export const getMissingFields = (ad: AdResponse): string[] => {
  const missing: string[] = [];
  const missingSet = new Set<string>();
  const paramsRecord = ad.params as Record<string, unknown>;

  if (!ad.description) {
    missing.push("Описание");
    missingSet.add("Описание");
  }

  REQUIRED_FIELDS_BY_CATEGORY[ad.category].forEach((key) => {
    const value = paramsRecord[key];

    if (!value) {
      const fieldName = FIELD_LABELS[key] ?? key;

      if (!missingSet.has(fieldName)) {
        missing.push(fieldName);
        missingSet.add(fieldName);
      }
    }
  });

  Object.entries(paramsRecord).forEach(([key, value]) => {
    const isKnownCategoryField = REQUIRED_FIELDS_BY_CATEGORY[ad.category].includes(key);

    if (!isKnownCategoryField && !value) {
      const fieldName = FIELD_LABELS[key] ?? key;

      if (!missingSet.has(fieldName)) {
        missing.push(fieldName);
        missingSet.add(fieldName);
      }
    }
  });

  return missing;
};
