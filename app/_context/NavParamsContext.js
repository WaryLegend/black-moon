"use client";

import { createContext, useContext } from "react";

const ParamsContext = createContext(null);

export function ParamsProvider({ params, children }) {
  return (
    <ParamsContext.Provider value={params}>{children}</ParamsContext.Provider>
  );
}

export function useParamsContext() {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error("useParamsContext must be used within ParamsProvider");
  }
  return context;
}
