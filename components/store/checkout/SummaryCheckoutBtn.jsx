"use client";

import { formatCurrency } from "@/utils/currency";
import { useCartStore } from "@/contexts/CartStore";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import OrderSummary from "./OrderSummary";

export default function SummaryCheckoutBtn() {
  const totalPrice = useCartStore((c) => c.getTotalPrice());
  return (
    <div className="bg-primary-0 shadow-md-reversed fixed right-0 bottom-0 left-0 px-4 py-1 transition-all sm:px-10 sm:py-2 md:px-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-primary-600 text-sm">Tổng thanh toán</p>
          <p className="text-xl font-bold">{formatCurrency(totalPrice)}</p>
        </div>
        <Modal>
          <Modal.Open opens="order-summary-dialog">
            <Button type="button">Xem đơn hàng</Button>
          </Modal.Open>
          <Modal.Window name="order-summary-dialog">
            <OrderSummary />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
