import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { listen } from "@tauri-apps/api/event";

export const UpdatesContext = createContext<{} | undefined>(undefined);

export const UpdatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useRef(false);

  const startListeners = useCallback(async () => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;

    await listen("updates", async () => {
      console.log("It works");
    });
  }, []);

  useEffect(() => {
    startListeners();
  }, [startListeners]);

  const contextValue = {};

  return (
    <UpdatesContext.Provider value={contextValue}>
      {children}
    </UpdatesContext.Provider>
  );
};

export const useUpdates = () => {
  const context = useContext(UpdatesContext);
  if (!context) {
    throw new Error("useUpdates must be used within a UpdatesProvider");
  }
  return context;
};
