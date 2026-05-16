"use client";

import { FaRegUser, FaUser } from "react-icons/fa";
import { GiCardboardBox, GiCardboardBoxClosed } from "react-icons/gi";
import { FaGear, FaGears } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import default_user from "@/public/default-user.jpg";
import Menus from "@/components/ui/Menus";
import Image from "next/image";
import { CurrentAccount } from "@/types/profile";
import ThemeToggleSwitch from "@/components/ui/ThemeToggleSwitch";

function UserMenu({ user }: { user: CurrentAccount }) {
  const { email } = user || {};
  const { fullName, avatarUrl } = user?.profile || {};

  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3">
        <div className="relative aspect-square size-[45px]">
          <Image
            src={avatarUrl || default_user}
            fill
            sizes="45px"
            alt="User's avatar"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex max-w-[25ch] flex-col">
          <span className="truncate font-semibold">{fullName}</span>
          <span className="text-primary-600 truncate text-sm font-light">
            {email}
          </span>
        </div>
      </div>

      {/* divider */}
      <div className="border-primary-300 bg-primary-300 mx-2 my-px h-px" />

      <Menus.Button
        title="Thông tin của tôi"
        className="group"
        onClick={() => router.push("/profile")}
        icon={
          <>
            <FaRegUser className="group-hover:hidden" />
            <FaUser className="hidden group-hover:block" />
          </>
        }
      />
      <Menus.Button
        title="Đơn hàng của tôi"
        className="group"
        onClick={() => router.push("/profile/orders")}
        icon={
          <>
            <GiCardboardBoxClosed className="group-hover:hidden" />
            <GiCardboardBox className="hidden group-hover:block" />
          </>
        }
      />
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

      <ThemeToggleSwitch />
    </>
  );
}

export default UserMenu;
