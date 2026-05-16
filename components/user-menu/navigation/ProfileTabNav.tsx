import { FaRegUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaGears } from "react-icons/fa6";
import TabNavItem from "./ProfileTabNavItem";

export type NavLinkType = (typeof navLinks)[number];

const navLinks = [
  {
    name: "Thông tin tài khoản",
    href: "/profile/info",
    icon: <FaRegUser className="h-4 w-4" />,
  },
  {
    name: "Lịch sử đơn hàng",
    href: "/profile/orders",
    icon: <MdOutlineShoppingCart className="h-4 w-4" />,
  },
  {
    name: "Địa chỉ giao hàng",
    href: "/profile/addresses",
    icon: <FaMapMarkerAlt className="h-4 w-4" />,
  },
  {
    name: "Cài đặt",
    href: "/profile/settings",
    icon: <FaGears className="h-4 w-4" />,
  },
];

export default function ProfileTabNav() {
  return (
    <aside>
      <nav className="bg-primary-200 h-fit rounded-t-lg">
        <ul className="flex">
          {navLinks.map((link) => (
            <TabNavItem key={link.name} link={link} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
