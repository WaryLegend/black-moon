"use client";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValue, animate } from "framer-motion";
import type { PanInfo } from "framer-motion";

type CarouselProps = {
  children: ReactNode;
  sliders: string[];
  initialIndex?: number;
};

function Carousel({ children, sliders, initialIndex }: CarouselProps) {
  const pathname = usePathname();
  const router = useRouter();

  const routeMap = useMemo(
    () => new Map(sliders.map((path, index) => [path, index])),
    [sliders],
  );

  const currentPath = pathname.replace(/^\//, "").split("/")[0].toLowerCase();
  const groupSlug = currentPath || sliders[0];

  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(initialIndex ?? routeMap.get(groupSlug) ?? 0);
  const x = useMotionValue(0);

  const [isReady, setIsReady] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const updateSize = () => {
      const w = container.offsetWidth;
      if (w === 0) return;

      setContainerWidth(w);
      // Jump thẳng tới vị trí không qua animation
      x.set(-activeIndexRef.current * w);
      setIsReady(true);
    };

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 100);
    });

    resizeObserver.observe(container);
    updateSize();

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [x]);

  useEffect(() => {
    if (!isReady || containerWidth === 0) return;

    const nextIndex = routeMap.get(groupSlug);
    if (nextIndex === undefined) {
      return;
    }
    if (nextIndex === activeIndexRef.current) return;

    activeIndexRef.current = nextIndex;
    animate(x, -nextIndex * containerWidth, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  }, [groupSlug, routeMap, isReady, containerWidth, x]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (containerWidth === 0) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Ngưỡng 20% chiều rộng hoặc tốc độ vuốt > 500px/s
    const threshold = containerWidth * 0.2;
    const isQuickSwipe = Math.abs(velocity) > 500;
    const isFarEnough = Math.abs(offset) > threshold;

    let nextIndex = activeIndexRef.current;

    if (isQuickSwipe || isFarEnough) {
      const direction = offset > 0 ? -1 : 1;
      nextIndex = Math.max(
        0,
        Math.min(sliders.length - 1, activeIndexRef.current + direction),
      );
    }

    animate(x, -nextIndex * containerWidth, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      velocity: info.velocity.x,
    });

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex;
      router.push(`/${sliders[nextIndex]}`, { scroll: false });
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-background relative h-full w-full overflow-hidden"
    >
      <motion.div
        className="flex h-full w-full touch-pan-y will-change-transform"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -containerWidth * (sliders.length - 1),
          right: 0,
        }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Carousel;
