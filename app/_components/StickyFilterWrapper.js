"use client";

import { useEffect, useRef } from "react";

function StickyFilterWrapper({ children }) {
  const filterRef = useRef(null);

  useEffect(() => {
    const filterElement = filterRef.current;
    if (!filterElement) return;

    const sentinel = document.createElement("div");
    sentinel.style.display = "contents";
    filterElement.parentNode.insertBefore(sentinel, filterElement);

    const observer = new IntersectionObserver(
      ([entry]) => {
        filterElement.dataset.sticky = entry.isIntersecting ? "false" : "true";
      },
      {
        threshold: 0,
        rootMargin: `-${
          document.documentElement.style.getPropertyValue("--header-height") ||
          "0px"
        } 0px 0px 0px`,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <div
      ref={filterRef}
      className="md:data-[sticky=true]:bg-primary-50/80 sticky top-[var(--header-height)] z-10"
    >
      {children}
    </div>
  );
}

export default StickyFilterWrapper;
