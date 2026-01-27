"use client";

import Button from "@/components/ui/Button";
import { useMenuStore } from "@/context/HomeMenuStore";
import { useRouter } from "next/navigation";

function ContinuteShoppingBtn() {
  const router = useRouter();
  const { activeLink, openMenu } = useMenuStore();
  // Determine where to go back when clicking "Continue shopping"
  const destination = activeLink || "/";

  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full lg:text-2xl"
      onClick={() => {
        openMenu(destination);
        router.push(destination);
      }}
    >
      Tiếp tục mua sắm
    </Button>
  );
}

export default ContinuteShoppingBtn;
