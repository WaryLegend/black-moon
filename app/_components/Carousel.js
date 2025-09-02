"use client";

import { useState, useEffect } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function Carousel({ children, routes }) {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveLink } = useMenuStore();

  // routes = ["women", "men", "kids"]
  const routeMap = routes.reduce((acc, route, i) => {
    acc[route] = i;
    return acc;
  }, {});

  // Determine category from clean pathname
  const category = pathname === "/" ? "women" : pathname.slice(1).toLowerCase();
  if (!routes.includes(category)) {
    notFound();
  }

  const initialIndex = routeMap[category] || 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [width, setWidth] = useState(0);

  const x = useMotionValue(0);
  const animatedX = useSpring(x, { stiffness: 200, damping: 40 }); // Less stiff, more damped for snappy feel

  // Handle window resize for full-screen slides
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync activeIndex with pathname changes
  useEffect(() => {
    const newCategory =
      pathname === "/" ? "women" : pathname.slice(1).toLowerCase();
    const newIndex = routeMap[newCategory] || 0;
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      setActiveLink(pathname);
    }
  }, [pathname, activeIndex, routeMap, setActiveLink]);

  // Animate to the active slide
  useEffect(() => {
    if (width > 0) {
      animatedX.set(-activeIndex * width);
    }
  }, [activeIndex, width, animatedX]);

  // Handle drag end for snapping
  const handleDragEnd = (event, { offset, velocity, point }) => {
    const threshold = width * 0.5;
    const velocityThreshold = 500;

    const direction = offset.x < 0 ? 1 : -1;
    const absVelocity = Math.abs(velocity.x);

    let newIndex = activeIndex;

    if (Math.abs(offset.x) > threshold || absVelocity > velocityThreshold) {
      newIndex = activeIndex + direction;
    }

    if (newIndex >= 0 && newIndex < routes.length) {
      setActiveIndex(newIndex);
      const newPath = newIndex === 0 ? "/" : `/${routes[newIndex]}`;
      router.push(newPath, { scroll: false });
      animatedX.set(-newIndex * width); // spring takes over
    } else {
      // snap back properly
      animatedX.set(-activeIndex * width);
    }
  };

  return (
    <>
      <motion.div
        className="z-10 flex h-full w-full"
        style={{ x: animatedX }}
        drag="x"
        dragConstraints={{ left: -width * (routes.length - 1), right: 0 }}
        dragElastic={0} // 1: slippery
        dragMomentum={false} // Prevent coasting after release
        onDragEnd={handleDragEnd}
      >
        {children}
      </motion.div>
    </>
  );
}

export default Carousel;
