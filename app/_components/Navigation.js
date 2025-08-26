"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Cửa hàng" },
    { href: "/about", label: "Về chúng tôi" },
  ];

  return (
    <nav className="z-10 hidden text-lg font-semibold sm:text-xl md:block">
      <ul className="flex items-center gap-5 sm:gap-10">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link href={link.href}>
                <p
                  className={`hover:text-accent-700 transition-all hover:scale-105 ${
                    isActive ? "underline" : ""
                  }`}
                >
                  {link.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
