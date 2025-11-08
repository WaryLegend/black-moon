"use client";

import { useColorsAndSizes } from "@/app/_context/ColorsAndSizesContext";
import { useState } from "react";

function ColorAndSizeInput({ product }) {
  const { colors: COLORS, sizes: SIZES } = useColorsAndSizes();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);

    // Reset size if not available for this color
  };

  return (
    <>
      {/* Colors */}
      <div>
        <p className="mb-2 font-medium">Màu sắc</p>
        <div className="flex flex-wrap gap-2">
          {COLORS.filter(({ value }) => product?.colors.includes(value)).map(
            ({ value, label }) => {
              return (
                <label key={value} className="relative">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    onChange={() => handleColorChange(value)}
                    className="peer hidden"
                    checked={selectedColor === value}
                  />
                  <span
                    className="border-primary-800 peer-checked:ring-accent-700 peer-hover:outline-accent-700 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all peer-checked:ring-2 peer-checked:ring-offset-2"
                    style={{
                      backgroundColor: value,
                    }}
                    title={label}
                  />
                </label>
              );
            },
          )}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium">Kích cỡ</p>
        <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3">
          {SIZES.map(({ value, label }) => {
            const isAvailable = false;
            return (
              <label key={value} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={value}
                  disabled={!isAvailable}
                  className="peer hidden"
                  onChange={() => setSelectedSize(value)}
                  checked={selectedSize === value}
                />
                <span
                  className={`border-primary-800 peer-checked:bg-accent-700 peer-checked:ring-accent-700 inline-flex h-8 w-16 items-center justify-center rounded-sm border text-sm transition-all select-none peer-checked:text-white peer-checked:ring-2 peer-checked:ring-offset-2 ${isAvailable ? "cursor-pointer" : "opacity-60"}`}
                >
                  {label}
                </span>
                {!isAvailable && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-sm">
                    <span className="bg-accent-700/60 absolute h-[1px] w-[120%] rotate-25"></span>
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ColorAndSizeInput;
