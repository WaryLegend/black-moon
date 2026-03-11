"use client";

import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
import { useSidebar } from "@/contexts/SidebarContext";
import Button from "@/components/ui/Button";

function ToggleSideBar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <Button
      icon
      className="hover:text-accent-700 rounded-full font-bold"
      onClick={toggleSidebar}
      aria-label="Toggle nav-sidebar"
    >
      {isOpen ? (
        <TbLayoutSidebarFilled className="h-6 w-6" title="Collapse sidebar" />
      ) : (
        <TbLayoutSidebar className="h-6 w-6" title="Expand sidebar" />
      )}
    </Button>
  );
}

export default ToggleSideBar;
