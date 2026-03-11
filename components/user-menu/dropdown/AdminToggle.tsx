"use client";

import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import { FiChevronDown } from "react-icons/fi";
import Menus from "@/components/ui/Menus";
import { CurrentAccount } from "@/types/profile";

function AdminToggle({
  id,
  admin,
  ...props
}: {
  id: string | number;
  admin: CurrentAccount;
}) {
  const { fullName, avatarUrl } = admin?.profile ?? {};

  const { openId } = Menus.useContext();

  return (
    <button
      className="hover:text-accent-700 flex items-center p-1 hover:underline"
      {...props}
    >
      <div className="relative aspect-square size-[32px]">
        <Image
          src={avatarUrl || default_user}
          fill
          sizes="32px"
          alt={`${fullName}'s avatar`}
          className="rounded-full border object-cover"
        />
      </div>
      <div className="max-w-[25ch]">
        <span className="ml-1 truncate font-semibold">{fullName}</span>
      </div>
      <FiChevronDown
        className={`transition-transform ${openId === id ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default AdminToggle;
