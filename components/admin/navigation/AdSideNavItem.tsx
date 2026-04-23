"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useSidebar } from "@/contexts/SidebarContext";
import { AdminNavLink } from "./AdSideNavList";

function AdSideNavItem({ link }: { link: AdminNavLink }) {
  const pathname = usePathname();
  const { isOpen, openSidebar } = useSidebar();
  const hasChildren = Boolean(link.children?.length);

  const isPathActive = (href?: string) =>
    !!href && (pathname === href || pathname.startsWith(`${href}/`));

  // Chỉ Active khi chính nó được chọn
  const isCurrentLinkActive = isPathActive(link.href);

  // Active "hộ" cho cha khi có con được chọn
  const hasActiveChild =
    link.children?.some((child) => isPathActive(child.href)) ?? false;

  const isBranchActive = isCurrentLinkActive || hasActiveChild;
  const [isExpanded, setIsExpanded] = useState(isBranchActive);

  // Tự động mở rộng nếu có con đang active
  useEffect(() => {
    if (hasActiveChild) setIsExpanded(true);
  }, [hasActiveChild]);

  // Đóng dropdown nếu sidebar thu nhỏ
  useEffect(() => {
    if (!isOpen) setIsExpanded(false);
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      if (!isOpen) {
        openSidebar();
        setIsExpanded(true);
      } else {
        setIsExpanded((prev) => !prev);
      }
    }
  };

  // Style chung cho cả Link và Button để đồng bộ UI
  const itemVariants = `group relative flex w-full items-center rounded-lg px-5 py-3 font-semibold transition-all duration-300 
    ${isBranchActive ? "text-primary-50" : "text-primary-900 hover:text-accent-600 hover:scale-105"}`;

  return (
    <li className="relative list-none">
      {/* Container chính cho Item (Cha hoặc Link đơn) */}
      <div className="relative">
        <Link
          href={hasChildren ? "#" : link.href || "#"}
          onClick={handleToggle}
          className={itemVariants}
        >
          <span className="shrink-0">{link.icon}</span>

          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out ${isOpen ? "ml-3 w-28 opacity-100" : "ml-0 w-0 opacity-0"}`}
          >
            {link.name}
          </span>

          {hasChildren && isOpen && (
            <IoChevronDown
              className={`ml-auto h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          )}

          {/* Tooltip khi sidebar đóng */}
          {!isOpen && (
            <div
              className={`pointer-events-none invisible absolute left-full z-50 ml-4 flex -translate-x-3 items-center opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
            >
              {/* Mũi tên nhỏ trỏ vào sidebar*/}
              <div
                className={`-mr-1 h-2 w-2 rotate-45 ${isBranchActive ? "bg-accent-500" : "bg-primary-300"}`}
              />

              <div
                className={`rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap shadow-xl ${
                  isBranchActive
                    ? "bg-accent-500 text-primary-0"
                    : "bg-primary-300 text-primary-800"
                }`}
              >
                {link.name}
              </div>
            </div>
          )}
        </Link>

        {/* NỀN ACTIVE: Chỉ bọc quanh item chính, không bọc con */}
        {isBranchActive && (
          <motion.div
            layoutId="activeLink"
            className="from-accent-600 to-accent-400 absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr shadow-md"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </div>

      {/* DROPDOWN CON (Dạng ngăn kéo) */}
      <AnimatePresence>
        {hasChildren && isExpanded && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="border-primary-200/40 mt-1 ml-5 flex flex-col gap-1 border-l-2 pb-2">
              {link.children?.map((child) => {
                const isChildLinkActive = isPathActive(child.href);
                return (
                  <li key={child.name}>
                    <Link
                      href={child.href || "#"}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                        isChildLinkActive
                          ? "text-accent-500 translate-x-1 font-bold"
                          : "text-primary-700 hover:text-accent-600 hover:translate-x-1"
                      }`}
                    >
                      <span className="text-lg">{child.icon}</span>
                      {child.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default AdSideNavItem;
