import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint, setIsMobile]);

  return isMobile;
}
