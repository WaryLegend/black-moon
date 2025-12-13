"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/app/_hooks/useIsMobile";

function TabNavItem({ link }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isActive =
    pathname === link.href || pathname.startsWith(link.href + "/");

  return (
    <li className="relative z-5 flex-1">
      <Link
        className={`group flex h-full items-center justify-center gap-4 rounded-lg px-4 py-3 font-semibold transition-colors xl:text-lg ${isActive ? "text-primary-50" : "hover:text-accent-600 hover:scale-105"}`}
        href={link.href}
        onClick={(e) => {
          if (isActive) e.preventDefault();
        }}
      >
        {link.icon}
        {!isMobile ? (
          <span>{link.name}</span>
        ) : (
          <>
            {/* Tooltip, appears from bottom on hover*/}
            <div
              className={`${isActive ? "from-accent-600 to-accent-400" : "text-primary-900 from-accent-200 to-accent-100"} invisible absolute top-full mt-2 -translate-y-3 rounded-lg bg-gradient-to-tr px-3 py-2 text-sm whitespace-nowrap opacity-20 shadow-md transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}
            >
              {link.name}
            </div>
          </>
        )}

        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="from-accent-600 to-accent-400 absolute inset-0 -z-[1] rounded-lg bg-gradient-to-tr shadow-md"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
    </li>
  );
}

export default TabNavItem;
