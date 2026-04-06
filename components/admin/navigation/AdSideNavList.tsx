import { type ReactNode } from "react";
import { FaTshirt, FaUsers, FaTicketAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdGroups2,
  MdOutlineCategory,
  MdOutlineInventory2,
  MdOutlineMenuBook,
  MdOutlineShoppingCart,
} from "react-icons/md";
import AdSideNavItem from "./AdSideNavItem";

const ADMIN_ROOT = "/admin";

const navLinks = [
  {
    name: "Dashboard",
    href: `${ADMIN_ROOT}/dashboard`,
    icon: <LuLayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Users",
    href: `${ADMIN_ROOT}/users`,
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    name: "Catalog",
    href: `${ADMIN_ROOT}/catalog`,
    icon: <MdOutlineMenuBook className="h-5 w-5" />,
    children: [
      {
        name: "Inventory",
        href: `${ADMIN_ROOT}/catalog/inventory`,
        icon: <MdOutlineInventory2 className="h-4 w-4" />,
      },
      {
        name: "Products",
        href: `${ADMIN_ROOT}/catalog/products`,
        icon: <FaTshirt className="h-4 w-4" />,
      },
      {
        name: "Categories",
        href: `${ADMIN_ROOT}/catalog/categories`,
        icon: <MdOutlineCategory className="h-4 w-4" />,
      },
      {
        name: "Groups",
        href: `${ADMIN_ROOT}/catalog/groups`,
        icon: <MdGroups2 className="h-4 w-4" />,
      },
    ],
  },
  {
    name: "Orders",
    href: `${ADMIN_ROOT}/orders`,
    icon: <MdOutlineShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Promotions",
    href: `${ADMIN_ROOT}/promotions`,
    icon: <FaTicketAlt className="h-5 w-5" />,
  },
];

export type AdminNavLink = {
  name: string;
  href?: string;
  icon: ReactNode;
  children?: AdminNavLink[];
};

function AdSideNavList() {
  return (
    <nav className="w-full flex-1">
      <ul className="text-primary-900 flex h-full shrink-0 flex-col gap-2">
        {navLinks.map((link) => (
          <AdSideNavItem key={link.name} link={link} />
        ))}
      </ul>
    </nav>
  );
}

export default AdSideNavList;
