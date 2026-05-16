"use client";

import { useCurrentAccount } from "@/hooks/useCurrentAccount";
import { FiLogOut } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useLogout } from "@/components/auth/useLogout";
import Menus from "@/components/ui/Menus";
import AdminToggle from "./dropdown/AdminToggle";
import AdminMenu from "./dropdown/AdminMenu";
import Spinner from "@/components/ui/Spinner";
import Modal from "@/components/ui/Modal";
import ConfirmChange from "@/components/ui/ConfirmChange";

export default function Admin() {
  const { data: admin, isPending } = useCurrentAccount();

  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout({
    redirect: pathname,
    isAdmin: true,
  });

  if (!admin || isPending) return;

  const menuId = "admin-menu";
  return (
    <>
      <Menus>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={menuId}>
              <AdminToggle id={menuId} admin={admin} />
            </Menus.Toggle>

            <Menus.List id={menuId} className="rounded-lg">
              <AdminMenu admin={admin} />
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
