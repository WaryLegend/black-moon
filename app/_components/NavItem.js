"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function NavItem({ link }) {
  const pathname = usePathname();
  const { toggleMenu } = useMenuStore();

  const isActive =
    pathname === link.href || pathname.startsWith(link.href + "/");

  const handleClick = (e) => {
    if (isActive) e.preventDefault();
    toggleMenu(link.href);
  };

  return (
    <li>
      <Link href={link.href} className="group relative" onClick={handleClick}>
        <p
          className={`group-hover:text-accent-700 transition-all ${
            isActive ? "" : "hover:scale-105"
          }`}
        >
          {link.label}
        </p>

        {isActive && (
          <motion.div
            layoutId="activeUnderline"
            className="bg-accent-900 group-hover:bg-accent-700 absolute right-0 left-0 h-[2px]"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
        )}
      </Link>
    </li>
  );
}

export default NavItem;
