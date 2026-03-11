"use client";

import { cn } from "@/utils/cn";
import { useLayoutEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function StickyHeaderWrapper({
  children,
  className = "",
}: Props) {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          "--header-height",
          `${height}px`,
        );
      }
    };

    updateHeaderHeight(); // Initial set
    window.addEventListener("resize", updateHeaderHeight);

    // Observe mutations for dynamic header content changes
    const observer = new MutationObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className={cn(
        `bg-primary-0 border-primary-400 sticky top-0 z-10 shadow-sm`,
        className,
      )}
    >
      {children}
    </div>
  );
}
