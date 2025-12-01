"use client";
import { useIsMobile } from "@/app/_hooks/useIsMobile";
import SummaryCartBtn from "./SummaryCartBtn";
import CartMenu from "./CartMenu";

function CartSummeryWrapper() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Desktop  */}
      {!isMobile && (
        <aside>
          <CartMenu />
        </aside>
      )}
      {/* Mobile fixed button */}
      {isMobile && <SummaryCartBtn />}
    </>
  );
}

export default CartSummeryWrapper;
