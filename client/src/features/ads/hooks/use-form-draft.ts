import { useEffect } from "react";
import type { FormInstance } from "antd";

import { type AdUpdateType } from "../types";

type UseFormDraftReturnType = {
  saveDraft: () => void;
  clearDraft: () => void;
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
        const parsed = JSON.parse(savedDraft);
        setTimeout(() => form.setFieldsValue(parsed), 0);
      } catch (e) {
        console.error("Ошибка парсинга черновика", e);
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
