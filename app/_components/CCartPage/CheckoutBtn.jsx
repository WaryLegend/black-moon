"use client";

import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/_context/CartStore";
import { useSettingStore } from "@/app/_context/SettingStore";

function CheckoutBtn({ disabled }) {
  const router = useRouter();
  // disabled if there's a quantity-issue in the cart
  const { getHasIssue } = useCartStore();
  const limit = useSettingStore((s) => s.settings?.order_limit ?? 10);

  return (
    <Button
      type="button"
      className="w-full lg:text-2xl"
      disabled={disabled || getHasIssue(limit)}
      onClick={() => router.push("/checkout")}
    >
      Thanh toán
    </Button>
  );
}

export default CheckoutBtn;
