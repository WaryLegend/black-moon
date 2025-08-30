"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Nữ" },
  { href: "/men", label: "Nam" },
  { href: "/kids", label: "Trẻ em" },
];

function NavList() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group relative"
              onClick={(e) => {
                if (isActive) e.preventDefault();
              }}
            >
              <p
                className={`group-hover:text-accent-700 transition-all ${
                  isActive ? "cursor-default" : "hover:scale-105"
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
      })}
    </>
  );
}

export default NavList;
