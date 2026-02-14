"use client";

import Image from "next/image";
import default_user from "@/public/default-user.jpg";
import { FiChevronDown } from "react-icons/fi";
import Menus from "@/components/ui/Menus";
import { useUserStore } from "@/contexts/UserStore";

function UserToggle({ id, ...props }: { id: string | number }) {
  const user = useUserStore((s) => s.user);
  const { firstName, avatar } = user || {};
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
      <FiChevronDown
        className={`transition-transform ${openId === id ? "rotate-180" : ""}`}
      />
    </button>
  );
}

export default UserToggle;
