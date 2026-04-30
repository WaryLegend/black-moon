"use client";

import { useMemo } from "react";
import { COLOR_OPTIONS } from "@/utils/constants";

type Props = {
  availableColors: string[];
  selectedColor: string | null;
  onChange: (color: string) => void;
};

export default function ColorOption({
  availableColors,
  selectedColor,
  onChange,
}: Props) {
  const normalizedSet = useMemo(
    () => new Set(availableColors.map((c) => c.toUpperCase())),
    [availableColors],
  );

  const filteredColors = useMemo(
    () => COLOR_OPTIONS.filter((item) => normalizedSet.has(item.value)),
    [normalizedSet],
  );

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
              checked={(selectedColor ?? "").toUpperCase() === value}
            />
            <span
              className="border-primary-800 peer-checked:ring-accent-700 peer-hover:outline-accent-700 ring-offset-primary-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-all peer-checked:ring-2 peer-checked:ring-offset-2"
              style={{ backgroundColor: label }}
              title={label}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
