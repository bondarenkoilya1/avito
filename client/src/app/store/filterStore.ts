import { create } from "zustand/react";

import type { AdCategory } from "@/features/ads/types";

type FilterStoreType = {
  selectedCategories: AdCategory[];
  showOnlyNeedsRevision: boolean;
  actions: {
    resetCategories: () => void;
    setCategories: (categories: AdCategory[]) => void;
    toggleOnlyNeedsRevision: () => void;
  };
};

const createInitialStore = (): Omit<FilterStoreType, "actions"> => ({
  selectedCategories: [],
  showOnlyNeedsRevision: false
});

const useFilterStore = create<FilterStoreType>((set) => ({
  ...createInitialStore(),
  actions: {
    resetCategories: () => set(createInitialStore()),
    setCategories: (categories) => set({ selectedCategories: categories }),
    toggleOnlyNeedsRevision: () =>
      set((state) => ({ showOnlyNeedsRevision: !state.showOnlyNeedsRevision }))
  }
}));

export const useSelectedCategories = (): FilterStoreType["selectedCategories"] =>
  useFilterStore((state) => state.selectedCategories);

export const useOnlyNeedsRevisionStatus = (): FilterStoreType["showOnlyNeedsRevision"] =>
  useFilterStore((state) => state.showOnlyNeedsRevision);

export const useFilterActions = (): FilterStoreType["actions"] =>
  useFilterStore((state) => state.actions);
