"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const length = images.length;

  // Auto slide
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 6000);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [length]);

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
  };

  const nextSlide = () => goToSlide((current + 1) % length);
  const prevSlide = () => goToSlide((current - 1 + length) % length);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm md:aspect-[16/7] lg:aspect-[8/4]">
      {/* Slides */}
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <Image
              src={img}
              alt={`Slide ${index}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="text-primary-0 bg-accent-900/40 absolute top-1/2 left-4 -translate-y-1/2 rounded-full px-3 py-2 transition hover:bg-black/60"
        aria-label="Next image"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="text-primary-0 bg-accent-900/40 absolute top-1/2 right-4 -translate-y-1/2 rounded-full px-3 py-2 transition hover:bg-black/60"
        aria-label="Previous image"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 flex w-full justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              current === index ? "scale-125 bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
