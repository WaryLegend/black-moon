"use client";

import { useRouter } from "next/navigation";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function NoProductsFound() {
  const router = useRouter();
  const { activeLink } = useMenuStore();

  const destination = activeLink || "/";

  return (
    <div className="bg-accent-100 rounded-md p-10 text-center">
      <p className="text-2xl font-semibold">
        Chưa có sản phẩm nào.{" "}
        <button
          onClick={() => router.push(destination)}
          className="text-accent-600 hover:text-accent-700 text-lg font-normal underline"
        >
          Quay lại
        </button>
      </p>
    </div>
  );
}

export default NoProductsFound;
