"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  HiMagnifyingGlassPlus,
  HiMagnifyingGlassMinus,
  HiArrowPath,
} from "react-icons/hi2";
import Button from "./Button";

const getHighResImage = (url: string): string => {
  if (url.includes("googleusercontent.com")) {
    return url.replace(/=s\d+(-c)?$/, "=s0");
  }
  return url;
};

function ImageViewer({ src, alt }: { src: string; alt?: string }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  const handleWheel = (e: React.WheelEvent) => {
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(Math.max(scale + delta, 1), 4);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    isDragging.current = true;
    start.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const modifyZoom = (delta: number) => {
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 1), 4);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  return (
    <div className="group relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden md:min-w-[600px]">
      {/* Thanh công cụ*/}
      <div
        className={`bg-primary-100/60 absolute bottom-6 z-20 flex items-center gap-1 rounded-full px-3 py-2 shadow-lg transition-all duration-300 ${scale > 1 ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <Button
          icon
          title="Zoom out"
          type="button"
          onClick={() => modifyZoom(-0.5)}
          className="text-accent-500 hover:text-accent-700 rounded-full"
        >
          <HiMagnifyingGlassMinus size={22} />
        </Button>

        <span className="text-primary-700 min-w-[50px] text-center text-xs font-medium">
          {Math.round(scale * 100)}%
        </span>

        <Button
          icon
          title="Zoom in"
          type="button"
          onClick={() => modifyZoom(0.5)}
          className="text-accent-500 hover:text-accent-700 rounded-full"
        >
          <HiMagnifyingGlassPlus size={22} />
        </Button>

        <div className="bg-primary-900/10 mx-1 h-5 w-[1px]" />

        <Button
          icon
          title="Reset"
          type="button"
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="text-accent-500 hover:text-accent-700 rounded-full"
        >
          <HiArrowPath size={22} />
        </Button>
      </div>

      {/* Khu vực ảnh chiếm tối đa diện tích có thể */}
      <div
        className="flex h-full w-full cursor-default items-center justify-center overflow-hidden py-4"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor:
              scale > 1
                ? isDragging.current
                  ? "grabbing"
                  : "grab"
                : "zoom-in",
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={() =>
            scale > 1 ? modifyZoom(-scale + 1) : modifyZoom(1)
          }
        >
          <Image
            src={getHighResImage(src)}
            alt={alt || "Enlarged image"}
            width={1200}
            height={1200}
            className="w-[500px] object-contain transition-shadow duration-300 select-none"
            draggable={false}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
