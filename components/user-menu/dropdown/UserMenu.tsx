"use client";

import { useUserStore } from "@/contexts/UserStore";
import { FaRegUser, FaUser } from "react-icons/fa";
import { GiCardboardBox, GiCardboardBoxClosed } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { FaGear, FaGears } from "react-icons/fa6";
import { useLogout } from "@/components/auth/useLogout";
import { usePathname } from "next/navigation";
import default_user from "@/public/default-user.jpg";
import Menus from "@/components/ui/Menus";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner";

function UserMenu() {
  const user = useUserStore((state) => state.user);
  const { firstName, lastName, email, avatar } = user || {};
  const name = `${lastName || ""} ${firstName || ""}`.trim();

  const pathname = usePathname();
  const { mutate: logout, isPending } = useLogout({ redirect: pathname });

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="relative aspect-square size-[45px]">
          <Image
            src={avatar || default_user}
            fill
            sizes="45px"
            alt="User's avatar"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex max-w-[25ch] flex-col">
          <span className="truncate font-semibold">{name}</span>
          <span className="text-primary-600 truncate text-sm font-light">
            {email}
          </span>
        </div>
      </div>

      {/* divider */}
      <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />

      <Menus.Button
        className="group gap-4"
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
        className="group gap-4"
        icon={
          <>
            <GiCardboardBoxClosed className="group-hover:hidden" />
            <GiCardboardBox className="hidden group-hover:block" />
          </>
        }
      >
        Đơn hàng của tôi
      </Menus.Button>
      <Menus.Button
        className="group gap-4"
        icon={
          <>
            <FaGear className="group-hover:hidden" />
            <FaGears className="hidden group-hover:block" />
          </>
        }
      >
        Cài đặt
      </Menus.Button>

      {/* divider */}
      <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />

      <Menus.Button
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
        className="gap-4 text-red-600"
        onClick={logout}
      >
        {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
      </Menus.Button>
    </>
  );
}

export default UserMenu;
