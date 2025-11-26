"use client";

import { useColorsAndSizes } from "@/app/_context/ColorsAndSizesContext";

function SizeRadio({ availableSizes, selectedSize, onChange }) {
  const { sizes: ALL_SIZES_LABELED } = useColorsAndSizes();

  return (
    <div>
      <p className="mb-2 font-medium">Kích cỡ</p>
      <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3">
        {ALL_SIZES_LABELED.map(({ value, label }) => {
          const isAvailable = availableSizes.includes(value);
          return (
            <label key={value} className="relative">
              <input
                type="radio"
                name="size"
                value={value}
                disabled={!isAvailable}
                className="peer hidden"
                onChange={() => onChange(value)}
                checked={selectedSize === value}
              />
              <span
                className={`border-accent-700 ring-offset-primary-0 peer-checked:bg-accent-600 peer-checked:ring-accent-600 inline-flex h-8 w-16 items-center justify-center rounded-sm border-2 text-sm transition-all select-none peer-checked:text-white peer-checked:ring-2 peer-checked:ring-offset-2 ${isAvailable ? "cursor-pointer" : "opacity-40"}`}
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
  );
}

export default SizeRadio;
