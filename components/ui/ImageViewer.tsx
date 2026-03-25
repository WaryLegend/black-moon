"use client";

import { useState, useRef } from "react";
import Image from "next/image";

function ImageViewer({ src }: { src: string }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  // 🖱️ Scroll zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;

    setScale((prev) => Math.min(Math.max(prev + delta, 1), 4));
  };

  // 🖐️ Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    start.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
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

  // ⚡ Double click
  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div
        className="relative max-h-[80vh] max-w-[90vw]"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <Image
          src={src}
          alt="Preview"
          width={800}
          height={800}
          draggable={false}
          className="cursor-grab object-contain select-none active:cursor-grabbing"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging.current ? "none" : "transform 0.2s ease",
          }}
          priority
        />
      </div>
    </div>
  );
}

export default ImageViewer;
