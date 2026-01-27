"use client";

import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { useMenuStore } from "@/context/HomeMenuStore";

function NoWishlistFound() {
  const router = useRouter();
  const { activeLink } = useMenuStore();

  const destination = activeLink || "/";

  return (
    <div className="flex flex-col gap-5 text-center">
      <p className="up text-2xl font-semibold">
        Không có sản phẩm nào trong danh sách mong muốn của bạn.
      </p>
      <p>
        Nhấn vào dấu trái tim <FaHeart className="inline align-middle" /> để
        thêm sản phẩm vào danh sách mong muốn của bạn.{" "}
        <button
          onClick={() => router.push(destination)}
          className="text-accent-600 hover:text-accent-700 font-normal underline"
        >
          Xem cửa hàng
        </button>
      </p>
    </div>
  );
}

export default NoWishlistFound;
