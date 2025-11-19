"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useProductStore } from "@/app/_context/ProductStore";
import ColorAndSizeSkeleton from "@/app/_components/Skeletons/ColorAndSizeSkeleton";
import ColorRadio from "./ColorRadio";
import SizeRadio from "./SizeRadio";

export default function ColorAndSizeRadio() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const _color = searchParams.get("color");
  const _size = searchParams.get("size");

  const product = useProductStore((s) => s.product);
  const selectedColor = useProductStore((s) => s.selectedColor);
  const selectedSize = useProductStore((s) => s.selectedSize);

  const setColor = useProductStore((s) => s.setColor);
  const setSize = useProductStore((s) => s.setSize);

  // fast variant lookup
  const variantsMap = useMemo(() => {
    const map = new Map();
    product?.variants.forEach((v) => {
      if (!map.has(v.color)) map.set(v.color, []);
      map.get(v.color).push(v.size);
    });
    return map;
  }, [product?.variants]);

  const availableColors = useMemo(() => {
    return [...new Set(product?.variants.map((v) => v.color))];
  }, [product?.variants]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return variantsMap.get(selectedColor) || [];
  }, [selectedColor, variantsMap]);

  // Initialize state on mount
  useEffect(() => {
    // Pick valid or first color
    const validColor = availableColors.includes(_color)
      ? _color
      : availableColors[0] || null;
    // Pick valid or first size for that color
    const sizesForColor = validColor ? variantsMap.get(validColor) || [] : [];
    const validSize =
      _size && sizesForColor.includes(_size) ? _size : sizesForColor[0] || null;
    // Set initial state
    setColor(validColor);
    setSize(validSize);
    // If URL missing/invalid → write correct params
    if (validColor && (validColor !== _color || validSize !== _size)) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("color", validColor);
      params.set("size", validSize);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantsMap]);

  // Handle color change (auto fix size)
  const handleColorChange = useCallback(
    (color) => {
      setColor(color);

      const sizesForColor = variantsMap.get(color) || [];
      const shouldKeepSize =
        selectedSize && sizesForColor.includes(selectedSize);
      const newSize = shouldKeepSize ? selectedSize : sizesForColor[0] || null;

      setSize(newSize);

      const params = new URLSearchParams(searchParams.toString());
      params.set("color", color);
      if (newSize) params.set("size", newSize);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [
      router,
      pathname,
      searchParams,
      selectedSize,
      variantsMap,
      setColor,
      setSize,
    ],
  );

  // Handle size change
  const handleSizeChange = useCallback(
    (size) => {
      setSize(size);

      const params = new URLSearchParams(searchParams.toString());
      params.set("size", size);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, setSize],
  );

  // render skeleton until initial state ready
  if (!selectedColor || !selectedSize) {
    return <ColorAndSizeSkeleton />;
  }

  return (
    <>
      {/* Colors */}
      <ColorRadio
        availableColors={availableColors}
        selectedColor={selectedColor}
        onChange={handleColorChange}
      />

      {/* Sizes */}
      <SizeRadio
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onChange={handleSizeChange}
      />
    </>
  );
}
