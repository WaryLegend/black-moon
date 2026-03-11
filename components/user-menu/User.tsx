"use client";

import Guest from "./Guest";
import Menus from "@/components/ui/Menus";
import UserMenu from "./dropdown/UserMenu";
import UserToggle from "./dropdown/UserToggle";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

export default function User() {
  const { data: user, isPending } = useCurrentAccount();
  if (!user || isPending) return <Guest />;

  const menuId = "user-menu";
  return (
    <>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={menuId}>
            <UserToggle id={menuId} user={user} />
          </Menus.Toggle>

          <Menus.List id={menuId} className="rounded-lg">
            <UserMenu user={user} />
          </Menus.List>
        </Menus.Menu>
      </Menus>
    </>
  );
}
