"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import CartMenu from "./CartMenu";
import SummaryCartBtn from "./SummaryCartBtn";

function CartSummeryWrapper() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <aside>
          <CartMenu />
        </aside>
      )}
      {isMobile && <SummaryCartBtn />}
    </>
  );
}

export default CartSummeryWrapper;
