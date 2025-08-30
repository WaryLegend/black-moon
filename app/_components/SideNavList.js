"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { FaTshirt, FaRegUser, FaGift } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";

const ADMIN_ROOT = "/admin";

const navLinks = [
  {
    name: "Dashboard",
    href: `${ADMIN_ROOT}/dashboard`,
    icon: <LuLayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Người dùng",
    href: `${ADMIN_ROOT}/users`,
    icon: <FaRegUser className="h-5 w-5" />,
  },
  {
    name: "Sản phẩm",
    href: `${ADMIN_ROOT}/products`,
    icon: <FaTshirt className="h-5 w-5" />,
  },
  {
    name: "Danh mục",
    href: `${ADMIN_ROOT}/categories`,
    icon: <MdOutlineCategory className="h-5 w-5" />,
  },
  {
    name: "Đơn hàng",
    href: `${ADMIN_ROOT}/orders`,
    icon: <MdOutlineShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Khuyến mãi",
    href: `${ADMIN_ROOT}/promotions`,
    icon: <FaGift className="h-5 w-5" />,
  },
];

function SideNavList() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="text-primary-900 flex h-full shrink-0 flex-col gap-2 text-lg">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.name} className="relative z-10">
              <Link
                className={`flex items-center gap-4 rounded-md border-2 border-transparent px-5 py-3 font-semibold transition-colors hover:underline ${isActive ? "text-primary-50" : "hover:scale-104"}`}
                href={link.href}
              >
                {link.icon}
                <p className="whitespace-nowrap">{link.name}</p>
              </Link>
              {isActive && (
                <motion.div
                  layoutId="activeLink" // smooth shared layout animation
                  className="border-accent-500 bg-accent-600 absolute inset-0 -z-[1] rounded-md border-2 shadow-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNavList;
