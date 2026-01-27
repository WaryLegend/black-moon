"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";

function AdSideNavItem({ link }) {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const isActive =
    pathname === link.href || pathname.startsWith(link.href + "/");

  return (
    <li className="relative z-5">
      <Link
        className={`flex items-center rounded-lg border-2 border-transparent px-5 py-3 font-semibold transition-colors hover:underline ${isActive ? "text-primary-50" : "hover:text-accent-600 hover:scale-105"} group`}
        href={link.href}
        onClick={(e) => {
          if (isActive) e.preventDefault();
        }}
      >
        {link.icon}
        <div
          className={`overflow-hidden whitespace-nowrap transition-all ${isOpen ? "ml-2 w-20 lg:w-25" : "w-0 opacity-0"}`}
        >
          {link.name}
        </div>
        {!isOpen && (
          <div
            className={`${isActive ? "from-accent-600 to-accent-400" : "text-primary-900 from-accent-200 to-accent-100"} invisible absolute left-full ml-4 -translate-x-3 rounded-lg bg-gradient-to-tr px-2 py-1 opacity-20 shadow-md transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
          >
            {link.name}
          </div>
        )}
      </Link>
      {isActive && (
        <motion.div
          layoutId="activeLink"
          className="from-accent-600 to-accent-400 absolute inset-0 -z-[1] rounded-lg bg-gradient-to-tr shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </li>
  );
}

export default AdSideNavItem;
