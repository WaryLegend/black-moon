"use client";

import { useEffect, useRef } from "react";

export default function StickyFilterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
      className="data-[sticky=true]:md:bg-primary-0/90 sticky top-[calc(var(--header-height)_+_1px)] z-10 rounded-lg transition duration-200 md:size-fit md:px-2 data-[sticky=true]:md:self-center data-[sticky=true]:md:shadow-sm"
      data-sticky="false"
    >
      {children}
    </div>
  );
}
