import { Status } from "@/generated/prisma";
import { createStore } from "zustand/vanilla";

type TOrderBy = [key: string, dir: "asc" | "desc"];

export type ApplicationState = {
  orderBy?: TOrderBy;
  search?: string;
  filter?: Status | "all";
  perPage?: number;
  page?: number;
};

export type ApplicationActions = {
  setOrderBy: (newKey: string) => void;
  setSearch: (newSearch: string) => void;
  setFilter: (newFilter: Status | "all") => void;
  setPerPage: (newLimitPerpage: number) => void;
  decreasePage: () => void;
  increasePage: () => void;
  setPage: (newPage: number) => void;
};

export type ApplicationStore = ApplicationState & ApplicationActions;

export const defaultInitState: ApplicationState = {
  orderBy: ["applicationDate", "desc"],
  search: undefined,
  filter: "all",
  perPage: 20,
  page: 1,
};

const getOrderBy = (newKey: string, state: ApplicationState): TOrderBy => {
  if (
    state.orderBy &&
    state.orderBy[0] === newKey &&
    state.orderBy[1] === "desc"
  )
    return [newKey, "asc"];
  return [newKey, "desc"];
};

export const createApplicationStore = (
  initState: ApplicationState = defaultInitState
) => {
  return createStore<ApplicationStore>()((set) => ({
    ...initState,
    setOrderBy: (newKey) =>
      set((state) => ({ orderBy: getOrderBy(newKey, state) })),
    setSearch: (newSearch) => set(() => ({ search: newSearch })),
    setFilter: (newFilter) => set(() => ({ filter: newFilter })),
    setPerPage: (newPerPage) => set(() => ({ perPage: newPerPage })),
    increasePage: () =>
      set((state) => ({ page: state.page ? state.page + 1 : 2 })),
    decreasePage: () =>
      set((state) => ({ page: state.page ? state.page - 1 : 1 })),
    setPage: (newPage) => set(() => ({ page: newPage })),
  }));
};
