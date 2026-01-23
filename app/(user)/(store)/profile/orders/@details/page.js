"use client";

import { fDate, formatCurrency } from "@/app/_utils/helpers";
import { ORDER_STATUS } from "@/app/_utils/constants";
import { useSearchParams } from "next/navigation";
import { useUserOrder } from "@/app/_components/CProfilePage/useUserOrder";
import { useEffect } from "react";
import OrderDetailItem from "@/app/_components/CProfilePage/OrderDetailItem";
import Spinner from "@/app/_components/Spinner";
import toast from "react-hot-toast";

export default function OrderDetailsPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { isLoading, order, isError, error } = useUserOrder({
    orderId,
    userId: "6",
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <div
      className={`flex flex-col gap-4 ${isLoading || !order ? "h-full justify-center" : ""}`}
    >
      {isLoading ? (
        <Spinner
          type="bar"
          color="var(--color-accent-600)"
          className="self-center"
        />
      ) : !order ? (
        <p className="text-primary-600 self-center">Đơn hàng không tồn tại.</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold">
            Chi tiết đơn hàng{" "}
            <span className="text-accent-600">{order.id}</span>
          </h2>
          <div className="bg-primary-50 border-primary-300 rounded-lg border-b p-4">
            <p className="text-primary-600 text-sm">
              Ngày đặt: {fDate(order.createdAt)}
            </p>
            <p className="text-primary-600 text-sm">
              Trạng thái:{" "}
              <span
                className={`rounded-full px-2 py-1 font-medium ${ORDER_STATUS[order.status]?.color}`}
              >
                {order.status}
              </span>
            </p>
            <p className="mt-2 text-left text-lg font-bold">
              Tổng cộng: {formatCurrency(order.totalAmount)}
            </p>
          </div>
          <ul className="divide-primary-300 flex flex-col divide-y">
            {order.items.map((item) => (
              <OrderDetailItem key={item.variantId} item={item} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
