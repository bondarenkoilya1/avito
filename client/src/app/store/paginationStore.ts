import { create } from "zustand/react";

type PaginationStoreType = {
  page: number;
  actions: {
    setPage: (newPage: number) => void;
    resetPage: () => void;
  };
};

const createInitialStore = (): Omit<PaginationStoreType, "actions"> => ({ page: 1 });

const usePaginationStore = create<PaginationStoreType>((set) => ({
  ...createInitialStore(),
  actions: {
    setPage: (newPage) => set({ page: newPage }),
    resetPage: () => set(createInitialStore())
  }
}));

export const usePage = (): PaginationStoreType["page"] => usePaginationStore((store) => store.page);

export const usePaginationActions = (): PaginationStoreType["actions"] =>
  usePaginationStore((store) => store.actions);
