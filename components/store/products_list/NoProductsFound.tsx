"use client";

import { useRouter } from "next/navigation";
import { useMenuStore } from "@/context/HomeMenuStore";

type Props = {
  hasActiveFilters: boolean;
};

function NoProductsFound({ hasActiveFilters }: Props) {
  const router = useRouter();
  const { activeLink } = useMenuStore();

  // Trường hợp 1: Có sản phẩm nhưng filter ra []
  if (hasActiveFilters) {
    return (
      <div className="bg-accent-50 rounded-lg p-10 text-center">
        <p className="text-2xl leading-relaxed font-semibold">
          Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn.
          <br className="sm:hidden" />
        </p>
      </div>
    );
  }

  // Trường hợp 2: Danh mục trống từ đầu
  return (
    <div className="bg-accent-50 rounded-lg p-10 text-center">
      <p className="text-2xl font-semibold">
        Hiện chưa có sản phẩm nào trong mục này.{" "}
        <button
          onClick={() => router.push(activeLink || "/")}
          className="text-accent-600 hover:text-accent-700 underline"
        >
          Quay lại.
        </button>
      </p>
    </div>
  );
}

export default NoProductsFound;
