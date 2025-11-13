"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/app/_utils/helpers";
import { FaGift, FaTicketAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useCartStore } from "@/app/_context/CartStore";
import CartMenuSkeleton from "@/app/_components/Skeletons/CartMenuSkeleton";
import Button from "@/app/_components/Button";
import ContinuteShoppingBtn from "./ContinuteShoppingBtn";

function CartMenu() {
  const isPending = useCartStore((state) => state.isPending);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const voucher = 5; // %
  const discount = (totalPrice * voucher) / 100;
  if (isPending) {
    return <CartMenuSkeleton />;
  }

  return (
    <div className="bg-primary-0 rounded-md">
      <div className="sticky top-[var(--header-height)] p-3">
        <div className="grid gap-[2vh]">
          {/* Order info */}
          <div className="border-primary-400 grid gap-5 rounded-md border p-5 lg:gap-8">
            {/* Order header */}
            <h1 className="text-lg font-bold uppercase lg:text-xl">
              Tổng đơn hàng | {totalItems} sản phẩm
            </h1>
            {/* Total price & vouchers */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-lg">
                <p>Tổng cộng</p>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-lg">
                  <p>Giảm giá</p>
                  <span className="text-green-600">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}
            </div>
            {/* Final total of all (discount, tax, ...) */}
            <div className="flex items-center justify-between text-lg font-bold uppercase lg:text-xl">
              <p>Tổng đơn</p>
              <span>{formatCurrency(totalPrice - discount)}</span>
            </div>
          </div>

          {/* Optional buttons */}
          <div className="divide-primary-300 border-primary-300 flex flex-col divide-y border-y-1">
            {/* add voucher?*/}
            <button className="px-2">
              <div className="inline-flex w-full items-center justify-between py-4 text-lg">
                <div className="inline-flex items-center gap-3">
                  <FaTicketAlt />
                  <p>Phiếu giảm giá</p>
                </div>
                <IoIosArrowForward />
              </div>
            </button>
            {/* Gifting to?*/}
            <button className="px-2">
              <div className="inline-flex w-full items-center justify-between py-4 text-lg">
                <div className="inline-flex items-center gap-3">
                  <FaGift />
                  <p>Tùy chọn quà tặng</p>
                </div>
                <IoIosArrowForward />
              </div>
            </button>
          </div>
          {/* Check out and continute shopping button */}
          <Button
            type="button"
            className="w-full lg:text-2xl"
            disabled={!totalItems}
          >
            Thanh toán
          </Button>
          <ContinuteShoppingBtn />
        </div>
      </div>
    </div>
  );
}

export default CartMenu;
