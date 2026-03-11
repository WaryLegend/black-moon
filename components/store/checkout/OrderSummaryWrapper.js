"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import SummaryCheckoutBtn from "./SummaryCheckoutBtn";
import OrderSummary from "./OrderSummary";

function OrderSummaryWrapper() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Desktop  */}
      {!isMobile && (
        <aside>
          <OrderSummary />
        </aside>
      )}
      {/* Mobile fixed button */}
      {isMobile && <SummaryCheckoutBtn />}
    </>
  );
}

export default OrderSummaryWrapper;
