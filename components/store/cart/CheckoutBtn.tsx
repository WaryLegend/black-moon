"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

import { useCartData } from "./useCart";

type CheckoutBtnProps = {
  disabled?: boolean;
};

function CheckoutBtn({ disabled }: CheckoutBtnProps) {
  const router = useRouter();
  const limit = 10; // temporary hardcode, will be replaced by setting store later
  const { getHasIssue } = useCartData();

  return (
    <Button
      type="button"
      className="w-full lg:text-2xl"
      disabled={Boolean(disabled) || getHasIssue(limit)}
      onClick={() => router.push("/checkout")}
    >
      Thanh toán
    </Button>
  );
}

export default CheckoutBtn;
