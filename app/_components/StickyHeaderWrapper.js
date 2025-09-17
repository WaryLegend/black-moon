"use client";

import { useEffect, useRef } from "react";

export default function StickyHeaderWrapper({ children }) {
  const headerRef = useRef(null);

  useEffect(() => {
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
      className="bg-primary-0 border-primary-400 sticky top-0 z-10 border-b-1"
    >
      {children}
    </div>
  );
}
