"use client";

import { FaRegUser, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaGear, FaGears } from "react-icons/fa6";
import { useLogout } from "@/components/auth/useLogout";
import { usePathname, useRouter } from "next/navigation";
import default_user from "@/public/default-user.jpg";
import Menus from "@/components/ui/Menus";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";
import { CurrentAccount } from "@/types/profile";
import { getRoleStyle } from "@/utils/constants";

function AdminMenu({ admin }: { admin: CurrentAccount }) {
  const { email, role } = admin || {};
  const { fullName, avatarUrl } = admin?.profile || {};

  const pathname = usePathname();

  const { mutate: logout, isPending } = useLogout({
    redirect: pathname,
    isAdmin: true,
  });
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="relative aspect-square size-[45px]">
          <Image
            src={avatarUrl || default_user}
            fill
            sizes="45px"
            alt="Admin's avatar"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex max-w-[25ch] flex-col">
          <div className="flex gap-2">
            <span className="truncate font-semibold">{fullName}</span>
            <span
              className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-xs ${getRoleStyle(role?.name)}`}
            >
              {role?.name ? role?.name.charAt(0).toUpperCase() : ""}
            </span>
          </div>
          <span className="text-primary-600 truncate text-sm font-light">
            {email}
          </span>
        </div>
      </div>

      {/* divider */}
      <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />

      <Menus.Button
        className="group"
        onClick={() => router.push("/admin/profile")}
        icon={
          <>
            <FaRegUser className="group-hover:hidden" />
            <FaUser className="hidden group-hover:block" />
          </>
        }
      >
        Thông tin của tôi
      </Menus.Button>

      <Menus.Button
        className="group"
        title="Cài đặt"
        icon={
          <>
            <FaGear className="group-hover:hidden" />
            <FaGears className="hidden group-hover:block" />
          </>
        }
      />

      {/* divider */}
      <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />

      <Menus.Button
        title={isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        disabled={isPending}
        icon={
          <>
            {isPending ? (
              <Spinner type="mini" color="var(--color-red-600)" />
            ) : (
              <FiLogOut className="rotate-180 text-red-600" />
            )}
          </>
        }
        className="text-red-600"
        onClick={logout}
      />
    </>
  );
}

export default AdminMenu;
