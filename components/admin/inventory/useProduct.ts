"use client";

import { useQuery, skipToken } from "@tanstack/react-query";
import { productsApi } from "@/services/products.api";

export function useProduct(productId?: number | null) {
  // Kiểm tra ID hợp lệ ngay từ đầu
  const validId =
    productId !== null && productId !== undefined && !isNaN(Number(productId))
      ? Number(productId)
      : null;

  const { data, isFetching, isPending, error } = useQuery({
    // Nếu validId là null, truyền skipToken thay cho toàn bộ queryKey hoặc queryFn
    queryKey: validId ? ["products", "id", validId] : [skipToken],
    queryFn: validId ? () => productsApi.getById(validId) : skipToken,
    staleTime: 5 * 60 * 1000,
    // Không cần dùng 'enabled' để check id nữa nếu đã dùng skipToken
  });

  return {
    product: data,
    isFetching,
    isPending,
    error,
  };
}
