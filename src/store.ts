import { create } from "zustand";

export interface GameQuery {
  searchText?: string;
  page?: number;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setPage: (newPage: number) => void;
  pageIncrement: () => void;
  pageDecrement: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: { page: 1 },
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
  setPage: (page) =>
    set((state) => ({
      gameQuery: { ...state.gameQuery, page },
    })),
  pageIncrement: () =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        page: (state.gameQuery.page ?? 1) + 1,
      },
    })),
  pageDecrement: () =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        page: (state.gameQuery.page ?? 1) - 1,
      },
    })),
}));

export default useGameQueryStore;
