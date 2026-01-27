import { FaTshirt, FaUsers, FaTicketAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineCategory,
  MdOutlineInventory2,
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
    name: "Categories",
    href: `${ADMIN_ROOT}/categories`,
    icon: <MdOutlineCategory className="h-5 w-5" />,
  },
  {
    name: "Products",
    href: `${ADMIN_ROOT}/products`,
    icon: <FaTshirt className="h-5 w-5" />,
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
  {
    name: "Inventory",
    href: `${ADMIN_ROOT}/inventory`,
    icon: <MdOutlineInventory2 className="h-5 w-5" />,
  },
];

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
