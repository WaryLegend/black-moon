"use client";

import Menus from "@/components/ui/Menus";
import AdminToggle from "./dropdown/AdminToggle";
import AdminMenu from "./dropdown/AdminMenu";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

export default function Admin() {
  const { data: admin, isPending } = useCurrentAccount();

  if (!admin || isPending) return;

  const menuId = "admin-menu";
  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={menuId}>
            <AdminToggle id={menuId} admin={admin} />
          </Menus.Toggle>

          <Menus.List id={menuId} className="rounded-lg">
            <AdminMenu admin={admin} />
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}
