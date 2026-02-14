"use client";

import Guest from "./Guest";
import { useUserStore } from "@/contexts/UserStore";
import Menus from "@/components/ui/Menus";
import UserMenu from "./dropdown/UserMenu";
import UserToggle from "./dropdown/UserToggle";

export default function User() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Guest />;

  const menuId = "user-menu";
  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={menuId}>
            <UserToggle id={menuId} />
          </Menus.Toggle>

          <Menus.List id={menuId} className="rounded-lg">
            <UserMenu />
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}
