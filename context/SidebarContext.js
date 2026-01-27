"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
