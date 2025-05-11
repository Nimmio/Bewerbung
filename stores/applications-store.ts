import { Application } from "@/lib/types";
import { createStore } from "zustand/vanilla";

export type ApplicationState = {
  applications: Application[];
};

export type ApplicationActions = {
  setApplications: (newApplications: Application[]) => void;
};

export type ApplicationStore = ApplicationState & ApplicationActions;

export const defaultInitState: ApplicationState = {
  applications: [],
};

export const createApplicationStore = (
  initState: ApplicationState = defaultInitState
) => {
  return createStore<ApplicationStore>()((set) => ({
    ...initState,
    setApplications: (newApplications) =>
      set(() => ({ applications: newApplications })),
  }));
};
