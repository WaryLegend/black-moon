"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMenuStore } from "@/context/HomeMenuStore";

interface NavLink {
  href: string;
  label: string;
}

function NavItem({ link }: { link: NavLink }) {
  const pathname = usePathname();
  const { toggleMenu } = useMenuStore();

  const isActive =
    pathname === link.href || pathname.startsWith(link.href + "/");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isActive) e.preventDefault();
    toggleMenu(link.href);
  };

  return (
    <motion.li layout>
      <Link
        href={link.href}
        className="group relative"
        onClick={handleClick}
        prefetch={true}
      >
        <span
          className={`group-hover:text-accent-700 transition-all${
            isActive ? "" : "hover:scale-105"
          }`}
        >
          {link.label}
        </span>

        {isActive && (
          <motion.div
            layoutId="activeUnderline"
            className="bg-accent-900 group-hover:bg-accent-700 absolute right-0 left-0 h-[2px]"
            initial={false}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

export default NavItem;
