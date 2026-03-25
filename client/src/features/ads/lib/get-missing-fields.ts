import type { AdResponse } from "@/features/ads/api/get-ad";
import { FIELD_LABELS, REQUIRED_FIELDS_BY_CATEGORY } from "@/features/ads/lib/labels";

const getParamValue = (params: AdResponse["params"], key: string): unknown => {
  if (key in params) {
    return (params as Record<string, unknown>)[key];
  }
  return undefined;
};

export const getMissingFields = (ad: AdResponse): string[] => {
  const missing: string[] = [];
  const missingSet = new Set<string>();

  if (!ad.description) {
    missing.push("Описание");
    missingSet.add("Описание");
  }

  const requiredFields = REQUIRED_FIELDS_BY_CATEGORY[ad.category];

  requiredFields.forEach((key) => {
    const value = getParamValue(ad.params, key);

    if (!value) {
      const fieldName = FIELD_LABELS[key] ?? key;

      if (!missingSet.has(fieldName)) {
        missing.push(fieldName);
        missingSet.add(fieldName);
      }
    }
  });

  const paramKeys = Object.keys(ad.params);
  paramKeys.forEach((key) => {
    const isRequired = requiredFields.includes(key);
    if (!isRequired) {
      const value = getParamValue(ad.params, key);
      if (!value) {
        const fieldName = FIELD_LABELS[key] ?? key;

        if (!missingSet.has(fieldName)) {
          missing.push(fieldName);
          missingSet.add(fieldName);
        }
      }
    }
  });

  return missing;
};
