"use client";

import { useAdminStore } from "@/contexts/AdminStore";
import Menus from "@/components/ui/Menus";
import AdminToggle from "./dropdown/AdminToggle";
import AdminMenu from "./dropdown/AdminMenu";

export default function Admin() {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;

  const menuId = "admin-menu";
  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={menuId}>
            <AdminToggle id={menuId} />
          </Menus.Toggle>

          <Menus.List id={menuId} className="rounded-lg">
            <AdminMenu />
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}
