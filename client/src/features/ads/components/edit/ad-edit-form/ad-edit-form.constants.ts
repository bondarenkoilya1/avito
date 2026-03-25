import { type AdCategory } from "@/features/ads/types";

export const MAX_DESCRIPTION_LENGTH = 1000;

export const CATEGORY_OPTIONS: { value: AdCategory; label: string }[] = [
  { value: "electronics", label: "Электроника" },
  { value: "auto", label: "Авто" },
  { value: "real_estate", label: "Недвижимость" }
];

export const ELECTRONICS_TYPE_OPTIONS = [
  { value: "phone", label: "Смартфон" },
  { value: "laptop", label: "Ноутбук" },
  { value: "misc", label: "Другое" }
];

export const ELECTRONICS_CONDITION_OPTIONS = [
  { value: "new", label: "Новое" },
  { value: "used", label: "Б/У" }
];

export const AUTO_TRANSMISSION_OPTIONS = [
  { value: "automatic", label: "Автомат" },
  { value: "manual", label: "Механика" }
];

export const REAL_ESTATE_TYPE_OPTIONS = [
  { value: "flat", label: "Квартира" },
  { value: "house", label: "Дом" },
  { value: "room", label: "Комната" }
];

const DEFAULT_AI_LABELS = {
  buttonLoading: "Выполняется запрос",
  buttonRetry: "Повторить запрос",
  popoverTitle: "Ответ AI:",
  popoverErrorTitle: "Ошибка запроса",
  errorMessage: "Не удалось получить оценку. Попробуйте позже.",
  applyButton: "Применить",
  closeButton: "Закрыть"
};

export const PRICE_AI_LABELS = {
  buttonDefault: "Узнать рыночную цену",
  ...DEFAULT_AI_LABELS
};

export const DESCRIPTION_GEN_LABELS = {
  buttonDefault: "Придумать описание",
  ...DEFAULT_AI_LABELS
};

export const DESCRIPTION_IMPROVE_LABELS = {
  buttonDefault: "Улучшить описание",
  ...DEFAULT_AI_LABELS
};
