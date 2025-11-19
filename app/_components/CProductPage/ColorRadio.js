"use client";

import { useColorsAndSizes } from "@/app/_context/ColorsAndSizesContext";
import { useMemo } from "react";

function ColorRadio({ availableColors, selectedColor, onChange }) {
  const { colors: ALL_COLORS_LABELED } = useColorsAndSizes();

  const filteredColors = useMemo(() => {
    return ALL_COLORS_LABELED.filter((item) =>
      availableColors.includes(item.value),
    );
  }, [ALL_COLORS_LABELED, availableColors]);

  return (
    <div>
      <p className="mb-2 font-medium">Màu sắc</p>
      <div className="flex flex-wrap gap-2">
        {filteredColors.map(({ value, label }) => (
          <label key={value} className="relative">
            <input
              type="radio"
              name="color"
              value={value}
              onChange={() => onChange(value)}
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
        ))}
      </div>
    </div>
  );
}

export default ColorRadio;
