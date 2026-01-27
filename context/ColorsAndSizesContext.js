"use client";

import { createContext, useContext } from "react";

const ColorsAndSizesContext = createContext(null);

export function ColorsAndSizesProvider({ children, value }) {
  return (
    <ColorsAndSizesContext.Provider value={value}>
      {children}
    </ColorsAndSizesContext.Provider>
  );
}

export function useColorsAndSizes() {
  const context = useContext(ColorsAndSizesContext);
  if (!context)
    throw new Error(
      "useColorsAndSizes must be used within ColorsAndSizesProvider",
    );
  return context;
}
