"use client";

import Button from "@/app/_components/Button";
import { useRouter } from "next/navigation";

function CheckoutBtn({ disabled }) {
  const router = useRouter();
  return (
    <Button
      type="button"
      className="w-full lg:text-2xl"
      disabled={disabled}
      onClick={() => router.push("/checkout")}
    >
      Thanh toán
    </Button>
  );
}

export default CheckoutBtn;
