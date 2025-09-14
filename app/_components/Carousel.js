"use client";

import { useState, useEffect, useMemo } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

function Carousel({ children, sliders }) {
  const pathname = usePathname();
  const router = useRouter();

  const routeMap = useMemo(
    () => sliders.reduce((acc, r, i) => ({ ...acc, [r]: i }), {}),
    [sliders],
  );

  // Determine group from clean pathname
  const group = pathname === "/" ? "women" : pathname.slice(1).toLowerCase();
  if (!sliders.includes(group)) {
    notFound();
  }

  const initialIndex = routeMap[group];

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [width, setWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const x = useMotionValue(0);
  const animatedX = useSpring(x, { stiffness: 300, damping: 40 }); // Less stiff, more damped for snappy feel

  // Handle window resize for full-screen slides
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync activeIndex with pathname changes
  useEffect(() => {
    const newGroup =
      pathname === "/" ? "women" : pathname.slice(1).toLowerCase();
    const newIndex = routeMap[newGroup];
    if (newIndex !== activeIndex && !isTransitioning) {
      setActiveIndex(newIndex);
    } else if (isTransitioning && newIndex === activeIndex) {
      setIsTransitioning(false);
    }
  }, [pathname, routeMap, isTransitioning, activeIndex]);

  // Animate to the active slide
  useEffect(() => {
    if (width > 0) {
      animatedX.set(-activeIndex * width);
    }
  }, [activeIndex, width, animatedX]);

  // Handle drag end for snapping
  const handleDragEnd = (event, { offset, velocity }) => {
    const threshold = width * 0.5;
    const velocityThreshold = 500;

    const direction = offset.x < 0 ? 1 : -1;
    const absVelocity = Math.abs(velocity.x);

    let newIndex = activeIndex;

    if (Math.abs(offset.x) > threshold || absVelocity > velocityThreshold) {
      newIndex = activeIndex + direction;
    }

    if (newIndex >= 0 && newIndex < sliders.length) {
      setActiveIndex(newIndex);
      const newPath = newIndex === 0 ? "/" : `/${sliders[newIndex]}`;
      setIsTransitioning(true);
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
        dragConstraints={{ left: -width * (sliders.length - 1), right: 0 }}
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
