"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { useMenuStore } from "@/contexts/HomeMenuStore";

function ContinuteShoppingBtn() {
  const router = useRouter();
  const { activeLink, openMenu } = useMenuStore();
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
