import { create } from "zustand";

export interface GameQuery {
  type: QueryTypes;
  searchText?: string;
  page?: number;
  year?: number | null;
}

export type QueryTypes = "movie" | "series";

interface GameQueryStore {
  gameQuery: GameQuery;
  setYear: (newYear: number | null) => void;
  setType: (type: QueryTypes) => void;
  setSearchText: (searchText: string) => void;
  setPage: (newPage: number) => void;
  pageIncrement: () => void;
  pageDecrement: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: { type: "movie", page: 1 },
  setYear: (year: number | null) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, year } })),
  setType: (type: QueryTypes) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, type } })),
  setSearchText: (searchText: string) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, searchText } })),
  setPage: (page: number) =>
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
