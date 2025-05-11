"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ApplicationStore,
  createApplicationStore,
} from "@/stores/applications-store";

export type ApplicationStoreApi = ReturnType<typeof createApplicationStore>;

export const ApplicationStoreContext = createContext<
  ApplicationStoreApi | undefined
>(undefined);

export interface ApplicationStoreProviderProps {
  children: ReactNode;
}

export const ApplicationStoreProvider = ({
  children,
}: ApplicationStoreProviderProps) => {
  const storeRef = useRef<ApplicationStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createApplicationStore();
  }

  return (
    <ApplicationStoreContext.Provider value={storeRef.current}>
      {children}
    </ApplicationStoreContext.Provider>
  );
};

export const useApplicationStore = <T,>(
  selector: (store: ApplicationStore) => T
): T => {
  const applicationStoreContext = useContext(ApplicationStoreContext);

  if (!applicationStoreContext) {
    throw new Error(
      `useApplicationStore must be used within ApplicationStoreProvider`
    );
  }

  return useStore(applicationStoreContext, selector);
};
