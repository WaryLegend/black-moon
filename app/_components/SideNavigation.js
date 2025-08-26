"use client";

import { FaTshirt, FaRegUser, FaGift } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCategory, MdOutlineShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";

import { useSidebar } from "../_context/SidebarContext";
import LogoLink from "@/app/_components/LogoLink";
import Link from "next/link";

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

function SideNavigation() {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  return (
    <aside
      style={{ gridRow: "1 / -1" }}
      className={`bg-primary-50 flex shrink-0 flex-col items-center gap-10 overflow-hidden py-5 transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-0 opacity-0"}`}
    >
      <LogoLink linkTo={ADMIN_ROOT} />
      <nav>
        <ul className="text-primary-900 flex h-full shrink-0 flex-col gap-2 text-lg">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.name}>
                <Link
                  className={`hover:bg-accent-500 hover:text-primary-100 flex items-center gap-4 rounded-md border-2 px-5 py-3 font-semibold transition-colors ${isActive ? "bg-accent-600 border-accent-500 text-accent-50 shadow-md" : "border-transparent"}`}
                  href={link.href}
                >
                  {link.icon}
                  <p className="whitespace-nowrap">{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideNavigation;
