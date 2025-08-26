"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Cửa hàng" },
    { href: "/about", label: "Về chúng tôi" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button - Visible only below md */}
      <button
        onClick={toggleSidebar}
        type="button"
        className="p-2 focus:outline-none md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <FiMenu className="text-primary-900 h-6 w-6" />
      </button>

      {/* Sidebar - Hidden on md and above, slides in when open */}
      <div
        className={`bg-primary-200/90 fixed top-0 right-0 h-full transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-20 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="mt-16 flex flex-col p-4">
          <nav>
            <ul className="flex flex-col gap-4 text-lg font-semibold">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <li key={link.href}>
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
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
        </div>
      </div>

      {/* Overlay when sidebar is open - Visible only below md */}
      {isOpen && (
        <div
          className="bg-primary-950/60 fixed inset-0 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}
