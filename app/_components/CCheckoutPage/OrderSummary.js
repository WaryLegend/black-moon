import { formatCurrency } from "@/app/_utils/helpers";
import { useCartStore } from "@/app/_context/CartStore";
import OrderSummarySkeleton from "@/app/_components/Skeletons/OrderSummarySkeletion";
import CheckItemList from "./CheckItemList";

export default function OrderSummary() {
  const isPending = useCartStore((state) => state.isPending);
  const totalItems = useCartStore((c) => c.getTotalItems());
  const totalPrice = useCartStore((c) => c.getTotalPrice());

  if (isPending) return <OrderSummarySkeleton />;
  // Tính phí ship giả lập
  // const shippingFee = formData.shippingMethod === "express" ? 45000 : 25000;
  const shippingFee = 0;
  const discount = 0;
  const finalTotal = totalPrice - discount + shippingFee;

  return (
    <div className="bg-primary-0 rounded-lg p-3 lg:shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Đơn hàng ({totalItems} sản phẩm)
      </h2>

      <CheckItemList />

      <div className="mt-6 space-y-3 border-t pt-4">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span>Giảm giá</span>
            <span className="text-green-600">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          {shippingFee > 0 ? (
            <span>{formatCurrency(shippingFee)}</span>
          ) : (
            <span className="text-green-600">Free</span>
          )}
        </div>
        <div className="border-t pt-3 text-xl font-bold">
          <div className="flex justify-between font-bold">
            <span>Tổng cộng</span>
            <span className="text-accent-600">
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
