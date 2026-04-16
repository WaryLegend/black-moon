"use client";

import { useEffect, useMemo, useState } from "react";
import type { CreateVariantMatrixItem } from "@/types/products";
import { COLOR_VALUES, SIZE_VALUES } from "@/utils/constants";
import TextButton from "@/components/ui/TextButton";
import { cn } from "@/utils/cn";

const EMPTY_DISABLED_KEYS: string[] = [];

const makeKey = (color: string, size: string) =>
  `${color.toLowerCase()}::${size.toLowerCase()}`;

type VariantMatrixBuilderProps = {
  basePrice: number;
  disabledKeys?: string[];
  onChange: (variants: CreateVariantMatrixItem[]) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export default function VariantMatrixBuilder({
  basePrice,
  disabledKeys = EMPTY_DISABLED_KEYS,
  onChange,
  ...props
}: VariantMatrixBuilderProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [hoveredSize, setHoveredSize] = useState<string | null>(null);

  const disabledSet = useMemo(() => new Set(disabledKeys), [disabledKeys]);
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);

  useEffect(() => {
    setSelectedKeys((prev) => {
      const next = prev.filter((key) => !disabledSet.has(key));

      if (
        next.length === prev.length &&
        next.every((key, index) => key === prev[index])
      ) {
        return prev;
      }

      return next;
    });
  }, [disabledSet]);

  const selectedByColor = useMemo(() => {
    const map = new Set<string>();
    selectedKeys.forEach((key) => {
      const [color] = key.split("::");
      if (color) map.add(color.toUpperCase());
    });
    return map;
  }, [selectedKeys]);

  const selectedBySize = useMemo(() => {
    const map = new Set<string>();
    selectedKeys.forEach((key) => {
      const [, size] = key.split("::");
      if (size) map.add(size.toUpperCase());
    });
    return map;
  }, [selectedKeys]);

  const selectedVariants = useMemo<CreateVariantMatrixItem[]>(
    () =>
      selectedKeys
        .map((key) => {
          const [color, size] = key.split("::");
          if (!color || !size) return null;

          return {
            color: color.toUpperCase(),
            size: size.toUpperCase(),
            price: basePrice,
            quantity: 0,
          };
        })
        .filter((item): item is CreateVariantMatrixItem => Boolean(item)),
    [basePrice, selectedKeys],
  );

  useEffect(() => {
    onChange(selectedVariants);
  }, [onChange, selectedVariants]);

  const getSelectableKeysByColor = (color: string) =>
    SIZE_VALUES.map((size) => makeKey(color, size)).filter(
      (key) => !disabledSet.has(key),
    );

  const getSelectableKeysBySize = (size: string) =>
    COLOR_VALUES.map((color) => makeKey(color, size)).filter(
      (key) => !disabledSet.has(key),
    );

  const setBulkSelection = (keys: string[]) => {
    if (!keys.length) return;

    setSelectedKeys((prev) => {
      const prevSet = new Set(prev);
      const allSelected = keys.every((key) => prevSet.has(key));

      if (allSelected) {
        return prev.filter((key) => !keys.includes(key));
      }

      const next = [...prev];
      keys.forEach((key) => {
        if (!prevSet.has(key)) next.push(key);
      });
      return next;
    });
  };

  const selectableAllKeys = useMemo(
    () =>
      COLOR_VALUES.flatMap((color) =>
        SIZE_VALUES.map((size) => makeKey(color, size)),
      ).filter((key) => !disabledSet.has(key)),
    [disabledSet],
  );

  return (
    <div role="group" className="space-y-2" {...props}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-primary-600 text-sm">Matrix (color x size)</p>
        <TextButton
          type="button"
          className="text-accent-700 text-sm font-medium underline-offset-2 hover:underline"
          onClick={() => setBulkSelection(selectableAllKeys)}
        >
          Select all
        </TextButton>
      </div>

      <div className="border-primary-300 bg-primary-0 overflow-x-auto rounded-lg border p-3 shadow-lg">
        <table className="min-w-full border-separate border-spacing-1 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 px-2 py-1 text-left">
                <span className="text-primary-700">Color/Size</span>
              </th>
              {SIZE_VALUES.map((size) => {
                const sizeSelected = selectedBySize.has(size);
                const sizeHovered = hoveredSize === size;

                return (
                  <th key={size} className="px-1 py-1 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setBulkSelection(getSelectableKeysBySize(size))
                      }
                      onMouseEnter={() => setHoveredSize(size)}
                      onMouseLeave={() => setHoveredSize(null)}
                      className={`w-full rounded-md px-2 py-1 text-sm font-semibold transition ${
                        sizeSelected
                          ? "bg-green-200 text-green-900"
                          : sizeHovered
                            ? "bg-blue-100 text-blue-900"
                            : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                      }`}
                    >
                      {size}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {COLOR_VALUES.map((color) => {
              const colorSelected = selectedByColor.has(color);
              const colorHovered = hoveredColor === color;

              return (
                <tr key={color}>
                  <td className="sticky left-0 px-1 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setBulkSelection(getSelectableKeysByColor(color))
                      }
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                      className={`w-full rounded-md px-2 py-2 text-left text-sm font-semibold transition ${
                        colorSelected
                          ? "bg-green-200 text-green-900"
                          : colorHovered
                            ? "bg-blue-100 text-blue-900"
                            : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                      }`}
                    >
                      {color}
                    </button>
                  </td>

                  {SIZE_VALUES.map((size) => {
                    const key = makeKey(color, size);
                    const checked = selectedSet.has(key);
                    const disabled = disabledSet.has(key);
                    const isHoverHighlight =
                      hoveredColor === color || hoveredSize === size;

                    return (
                      <td key={size} className="px-1 py-1 text-center">
                        <label
                          className={cn(
                            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition sm:h-10 sm:w-10",
                            disabled
                              ? "bg-primary-100 border-primary-200 cursor-not-allowed opacity-45"
                              : checked
                                ? "border-green-500 bg-green-100"
                                : isHoverHighlight
                                  ? "border-blue-300 bg-blue-50"
                                  : "border-primary-300 bg-primary-0 hover:border-primary-500 hover:bg-primary-50",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            className={cn(
                              "h-4 w-4 cursor-pointer accent-green-600 sm:h-5 sm:w-5",
                              disabled && "cursor-not-allowed",
                            )}
                            onChange={(event) => {
                              const isChecked = event.target.checked;
                              setSelectedKeys((prev) =>
                                isChecked
                                  ? prev.includes(key)
                                    ? prev
                                    : [...prev, key]
                                  : prev.filter((item) => item !== key),
                              );
                            }}
                            aria-label={`Select ${color} - ${size}`}
                          />
                        </label>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const toVariantCombinationKey = (color: string, size: string) =>
  makeKey(color, size);
