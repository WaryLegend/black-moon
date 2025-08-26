"use client";

import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
import { useSidebar } from "../_context/SidebarContext";

function ToggleSideBar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <button className="hover:cursor-pointer" onClick={toggleSidebar}>
      {isOpen ? (
        <TbLayoutSidebarFilled className="h-6 w-6" />
      ) : (
        <TbLayoutSidebar className="h-6 w-6" />
      )}
    </button>
  );
}

export default ToggleSideBar;
