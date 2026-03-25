import { useEffect } from "react";
import type { FormInstance } from "antd";

import { type AdCategory, type AdUpdateType } from "../types";

type UseFormDraftReturnType = {
  saveDraft: () => void;
  clearDraft: () => void;
};

const VALID_CATEGORIES: AdCategory[] = ["auto", "real_estate", "electronics"];

const isValidDraft = (data: unknown): data is Partial<AdUpdateType> => {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }

  const draft = data as Record<string, unknown>;

  if (draft.category !== undefined && !VALID_CATEGORIES.includes(draft.category as AdCategory)) {
    return false;
  }

  if (draft.title !== undefined && typeof draft.title !== "string") {
    return false;
  }

  if (draft.price !== undefined && typeof draft.price !== "number") {
    return false;
  }

  if (draft.description !== undefined && typeof draft.description !== "string") {
    return false;
  }

  if (draft.params !== undefined && (typeof draft.params !== "object" || draft.params === null)) {
    return false;
  }

  return true;
};

export const useFormDraft = (
  id: string | undefined,
  form: FormInstance<AdUpdateType>
): UseFormDraftReturnType => {
  const storageKey = `ad_draft_${id}`;

  useEffect(() => {
    if (!id) return;
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      try {
        const parsed: unknown = JSON.parse(savedDraft);
        if (isValidDraft(parsed)) {
          setTimeout(() => form.setFieldsValue(parsed), 0);
        } else {
          console.warn("Черновик повреждён, удаляем:", storageKey);
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.error("Ошибка парсинга черновика", e);
        localStorage.removeItem(storageKey);
      }
    }
  }, [id, form, storageKey]);

  const saveDraft = (): void => {
    if (!id) return;
    const currentValues = form.getFieldsValue();
    if (Object.keys(currentValues).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(currentValues));
    }
  };

  const clearDraft = (): void => {
    localStorage.removeItem(storageKey);
  };

  return { saveDraft, clearDraft };
};
