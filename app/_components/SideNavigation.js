"use client";

import { useSidebar } from "@/app/_context/SidebarContext";

function SideNavigation({ children }) {
  const { isOpen } = useSidebar();

  return (
    <aside
      style={{ gridRow: "1 / -1" }}
      className={`bg-primary-50 flex shrink-0 flex-col items-center gap-10 overflow-hidden py-5 transition-all duration-300 ease-in-out ${isOpen ? "w-54 lg:w-64" : "w-0 opacity-0"}`}
    >
      {children}
    </aside>
  );
}

export default SideNavigation;
