"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useProductStore } from "@/context/ProductStore";
import ColorAndSizeSkeleton from "@/components/skeletons/ColorAndSizeSkeleton";
import ColorRadio from "./ColorRadio";
import SizeRadio from "./SizeRadio";

/**
 * Component chính chịu trách nhiệm:
 * - Hiển thị lựa chọn Màu sắc & Kích cỡ
 * - Đồng bộ state (Zustand) ↔ URL query params (?color=...&size=...)
 * - Tự động chọn variant hợp lệ đầu tiên khi vào trang
 * - Khi đổi màu → tự động điều chỉnh size nếu size cũ không tồn tại
 */
export default function ColorAndSizeRadio() {
  // === Next.js Navigation hooks ===
  const router = useRouter();
  const pathname = usePathname(); // ví dụ: /[categoryId]/[productId]
  const searchParams = useSearchParams();

  // Đọc color/size hiện tại từ URL (có thể là null)
  const _color = searchParams.get("color");
  const _size = searchParams.get("size");

  // === Zustand state (lưu trạng thái đã chọn) ===
  const product = useProductStore((s) => s.product);
  const selectedColor = useProductStore((s) => s.selectedColor);
  const selectedSize = useProductStore((s) => s.selectedSize);
  const setColor = useProductStore((s) => s.setColor);
  const setSize = useProductStore((s) => s.setSize);

  // 1. Tối ưu hóa truy xuất variant (tránh lặp lại vòng lặp)
  // Map: color → [các size có sẵn]
  const variantsMap = useMemo(() => {
    const map = new Map();
    product?.variants.forEach((v) => {
      if (!map.has(v.color)) map.set(v.color, []);
      map.get(v.color).push(v.size);
    });
    return map;
  }, [product?.variants]);

  // Danh sách tất cả màu có sẵn
  const availableColors = useMemo(() => {
    return [...new Set(product?.variants.map((v) => v.color))];
  }, [product?.variants]);

  // Danh sách size khả dụng theo màu đã chọn
  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return variantsMap.get(selectedColor) || [];
  }, [selectedColor, variantsMap]);

  // 2. Khởi tạo lần đầu
  useEffect(() => {
    // Chưa có dữ liệu variant hoặc đã chạy rồi → bỏ qua
    if (!variantsMap.size) return;

    // Xác định color hợp lệ (ưu tiên URL → nếu không có/không hợp lệ → lấy cái đầu tiên)
    const validColor = availableColors.includes(_color)
      ? _color
      : availableColors[0] || null;

    // Lấy danh sách size của màu đó
    const sizesForColor = validColor ? variantsMap.get(validColor) || [] : [];

    // Xác định size hợp lệ (ưu tiên URL → nếu không hợp lệ → lấy size đầu tiên)
    const validSize =
      _size && sizesForColor.includes(_size) ? _size : sizesForColor[0] || null;

    // Cập nhật Zustand state
    setColor(validColor);
    setSize(validSize);

    // Nếu URL sai hoặc thiếu → sửa lại URL cho đúng (replace để không tạo history)
    if (validColor && (validColor !== _color || validSize !== _size)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", validColor);
      if (validSize) params.set("size", validSize);
      else params.delete("size"); // tránh để lại size rác

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [
    variantsMap,
    availableColors,
    _color,
    _size,
    router,
    pathname,
    searchParams,
    setColor,
    setSize,
  ]);

  // 3. Khi người dùng đổi màu
  const handleColorChange = useCallback(
    (color) => {
      setColor(color);

      const sizesForColor = variantsMap.get(color) || [];
      // Giữ size cũ nếu màu mới vẫn hỗ trợ size đó
      const shouldKeepSize =
        selectedSize && sizesForColor.includes(selectedSize);
      const newSize = shouldKeepSize ? selectedSize : sizesForColor[0] || null;

      setSize(newSize);

      // Cập nhật URL
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", color);
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

  // 4. Khi người dùng đổi kích cỡ
  const handleSizeChange = useCallback(
    (size) => {
      setSize(size);

      const params = new URLSearchParams(searchParams.toString());
      params.set("size", size);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, setSize],
  );

  // 5. Hiển thị skeleton nếu chưa chọn được color/size (đang khởi tạo)
  if (!selectedColor || !selectedSize) {
    return <ColorAndSizeSkeleton />;
  }

  // 6. Render giao diện chính
  return (
    <>
      {/* Danh sách màu */}
      <ColorRadio
        availableColors={availableColors}
        selectedColor={selectedColor}
        onChange={handleColorChange}
      />

      {/* Danh sách kích cỡ (chỉ hiển thị của màu đang chọn) */}
      <SizeRadio
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onChange={handleSizeChange}
      />
    </>
  );
}
