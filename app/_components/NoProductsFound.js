"use client";

import { useRouter } from "next/navigation";

function NoProductsFound({ categoryName }) {
  const router = useRouter();

  return (
    <div className="bg-accent-100 rounded-sm p-10 text-center">
      <p className="text-2xl font-semibold">
        Tên_thể_loại chưa có sản phẩm nào.{" "}
        <button
          onClick={() => router.back()}
          className="text-accent-600 hover:text-accent-700 text-lg font-normal underline"
        >
          Quay lại
        </button>
      </p>
    </div>
  );
}

export default NoProductsFound;
