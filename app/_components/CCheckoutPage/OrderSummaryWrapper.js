"use client";

import OrderSummary from "@/app/_components/CCheckoutPage/OrderSummary";
import SummaryButton from "@/app/_components/CCheckoutPage/SummaryButton";
import { useIsMobile } from "@/app/_hooks/useIsMobile";

function OrderSummaryWrapper() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Desktop  */}
      {!isMobile && (
        <div className="sticky top-[cal(var(--header-height)_+_1px)]">
          <OrderSummary />
        </div>
      )}
      {/* Mobile fixed button */}
      {isMobile && <SummaryButton />}
    </>
  );
}

export default OrderSummaryWrapper;
