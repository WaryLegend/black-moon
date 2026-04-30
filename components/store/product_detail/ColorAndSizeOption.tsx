"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import ColorAndSizeSkeleton from "@/components/skeletons/ColorAndSizeSkeleton";
import { useProductStore } from "@/contexts/ProductStore";

import ColorOption from "./ColorOption";
import SizeOption from "./SizeOption";

export default function ColorAndSizeOption() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlColor = searchParams.get("color");
  const urlSize = searchParams.get("size");

  const product = useProductStore((s) => s.product);
  const selectedColor = useProductStore((s) => s.selectedColor);
  const selectedSize = useProductStore((s) => s.selectedSize);
  const setColor = useProductStore((s) => s.setColor);
  const setSize = useProductStore((s) => s.setSize);

  const variantsMap = useMemo(() => {
    const map = new Map<string, string[]>();
    product?.variants.forEach((v) => {
      if (!v.color) return;
      const key = v.color.toUpperCase();
      if (!map.has(key)) map.set(key, []);
      if (v.size) map.get(key)?.push(v.size.toUpperCase());
    });
    return map;
  }, [product?.variants]);

  const availableColors = useMemo(() => [...variantsMap.keys()], [variantsMap]);

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return variantsMap.get(selectedColor.toUpperCase()) || [];
  }, [selectedColor, variantsMap]);

  useEffect(() => {
    if (!variantsMap.size) return;

    const normalizedUrlColor = urlColor?.toUpperCase() ?? null;
    const normalizedUrlSize = urlSize?.toUpperCase() ?? null;

    const validColor = availableColors.includes(normalizedUrlColor ?? "")
      ? normalizedUrlColor
      : (availableColors[0] ?? null);

    const sizesForColor = validColor ? variantsMap.get(validColor) || [] : [];
    const validSize =
      normalizedUrlSize && sizesForColor.includes(normalizedUrlSize)
        ? normalizedUrlSize
        : (sizesForColor[0] ?? null);

    setColor(validColor);
    setSize(validSize);

    if (
      validColor &&
      (validColor !== normalizedUrlColor || validSize !== normalizedUrlSize)
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", validColor);
      if (validSize) params.set("size", validSize);
      else params.delete("size");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    variantsMap,
    availableColors,
    urlColor,
    urlSize,
    router,
    pathname,
    searchParams,
    setColor,
    setSize,
  ]);

  const handleColorChange = useCallback(
    (color: string) => {
      setColor(color);
      const sizesForColor = variantsMap.get(color.toUpperCase()) || [];
      const normalizedSelectedSize = selectedSize?.toUpperCase() ?? null;
      const newSize =
        normalizedSelectedSize && sizesForColor.includes(normalizedSelectedSize)
          ? normalizedSelectedSize
          : (sizesForColor[0] ?? null);

      setSize(newSize);

      const params = new URLSearchParams(searchParams.toString());
      params.set("color", color.toUpperCase());
      if (newSize) params.set("size", newSize);
      else params.delete("size");
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

  const handleSizeChange = useCallback(
    (size: string) => {
      setSize(size.toUpperCase());
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", size.toUpperCase());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, setSize],
  );

  if (!selectedColor) return <ColorAndSizeSkeleton />;

  return (
    <>
      <ColorOption
        availableColors={availableColors}
        selectedColor={selectedColor}
        onChange={handleColorChange}
      />
      <SizeOption
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onChange={handleSizeChange}
      />
    </>
  );
}
