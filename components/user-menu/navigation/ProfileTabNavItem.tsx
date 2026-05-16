"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { NavLinkType } from "./ProfileTabNav";
import Tooltip from "@/components/ui/Tooltip"; // Giả sử đây là đường dẫn của bạn

function ProfileTabNavItem({ link }: { link: NavLinkType }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isActive =
    pathname === link.href || pathname.startsWith(link.href + "/");

  return (
    <li className="relative z-5 flex-1">
      <Tooltip
        content={link.name}
        disabled={!isMobile}
        position="bottom"
        className="h-full w-full"
        contentClassName={
          isActive
            ? "from-accent-600 to-accent-400 bg-gradient-to-tr text-white"
            : ""
        }
      >
        <Link
          className={`group flex h-full w-full items-center justify-center gap-4 rounded-lg py-2 text-sm font-semibold transition-colors sm:py-3 ${
            isActive
              ? "text-primary-50"
              : "hover:text-accent-600 hover:scale-105"
          }`}
          href={link.href}
          onClick={(e) => {
            if (isActive) e.preventDefault();
          }}
        >
          {link.icon}

          {!isMobile && <span>{link.name}</span>}

          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="from-accent-600 to-accent-400 absolute inset-0 -z-[1] rounded-lg bg-gradient-to-tr shadow-md"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </Link>
      </Tooltip>
    </li>
  );
}

export default ProfileTabNavItem;
