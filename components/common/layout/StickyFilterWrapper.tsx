"use client";

import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";

type StickyFilterWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function StickyFilterWrapper({
  children,
  className = "",
}: StickyFilterWrapperProps) {
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;

    const headerHeight =
      document.documentElement.style.getPropertyValue("--header-height") ||
      "0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        el.dataset.sticky = isVisible ? "true" : "false";
      },
      {
        rootMargin: `-${parseInt(headerHeight) + 1}px 0px -100% 0px`,
        threshold: 0,
      },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={filterRef}
      className={cn(
        "data-[sticky=true]:bg-primary-0/95 sticky top-[calc(var(--header-height)_+_1px)] z-10 rounded-lg transition duration-200 data-[sticky=true]:w-full data-[sticky=true]:shadow-sm md:px-2",
        className,
      )}
      data-sticky="false"
    >
      {children}
    </div>
  );
}
