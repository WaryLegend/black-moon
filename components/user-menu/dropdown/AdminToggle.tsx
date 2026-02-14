"use client";

import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import { FiChevronDown } from "react-icons/fi";
import Menus from "@/components/ui/Menus";
import { useAdminStore } from "@/contexts/AdminStore";

function AdminToggle({ id, ...props }: { id: string | number }) {
  const admin = useAdminStore((s) => s.admin);
  const { firstName, lastName, avatar } = admin || {};
  const name = `${lastName || ""} ${firstName || ""}`.trim();

  const { openId } = Menus.useContext();

  return (
    <button
      className="hover:text-accent-700 group flex items-center p-1 hover:underline"
      {...props}
    >
      <div className="relative aspect-square size-[32px]">
        <Image
          src={avatar || default_user}
          fill
          sizes="32px"
          alt={`${firstName}'s avatar`}
          className="border-primary-800 group-hover:border-accent-700 rounded-full border object-cover"
        />
      </div>
      <div className="max-w-[25ch]">
        <span className="ml-1 truncate font-semibold">{name}</span>
      </div>
      <FiChevronDown
        className={`transition-transform ${openId === id ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default AdminToggle;
