"use client";

import Button from "@/app/_components/Button";
import { useMenuStore } from "@/app/_context/HomeMenuStore";
import { useRouter } from "next/navigation";

function ContinuteShoppingBtn() {
  const router = useRouter();
  const { activeLink } = useMenuStore();

  // Determine where to go when clicking "Continue shopping"
  const destination = activeLink || "/";

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full lg:text-2xl"
      onClick={() => router.push(destination)}
    >
      Tiếp tục mua sắm
    </Button>
  );
}

export default ContinuteShoppingBtn;
