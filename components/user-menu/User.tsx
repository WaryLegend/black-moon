"use client";

import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { useLogout } from "@/components/auth/useLogout";
import Guest from "./Guest";
import Menus from "@/components/ui/Menus";
import UserMenu from "./dropdown/UserMenu";
import UserToggle from "./dropdown/UserToggle";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";
import ConfirmChange from "@/components/ui/ConfirmChange";

export default function User() {
  const { data: user, isPending } = useCurrentAccount();

  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout({
    redirect: pathname,
  });

  if (!user || isPending) return <Guest />;

  const menuId = "user-menu";
  return (
    <>
      <Menus>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId}>
              <UserToggle id={menuId} user={user} />
            </Menus.Toggle>
            <Menus.List id={menuId} className="rounded-lg">
              <UserMenu user={user} />
              {/* divider */}
              <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />
              <Modal.Open opens="logout-confirm">
                <Menus.Button
                  title={isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                  disabled={isLoggingOut}
                  icon={
                    <>
                      {isLoggingOut ? (
                        <Spinner type="mini" color="var(--color-red-600)" />
                      ) : (
                        <FiLogOut className="rotate-180 text-red-600" />
                      )}
                    </>
                  }
                  className="text-red-600"
                />
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="logout-confirm">
              <ConfirmChange
                title="Đăng xuất"
                message={<>Bạn có chắc chắn muốn đăng xuất không?</>}
                disabled={isLoggingOut}
                onConfirm={logout}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Menus>
    </>
  );
}
