"use client";

import CartListSkeleton from "@/components/skeletons/CartListSkeleton";
import { useSettingStore } from "@/contexts/SettingStore";

import CartItem from "./CartItem";
import NoCartlistFound from "./NoCartlistFound";
import { useCartData } from "./useCart";

function CartList() {
  const { items, isPending } = useCartData();
  const limit = useSettingStore((s) => s.settings?.order_limit ?? 10);

  if (isPending) return <CartListSkeleton />;
  if (items.length === 0) return <NoCartlistFound />;

  const problematicCount = items.filter((item) => {
    if (item.quantity > limit) return true;
    if (item.stock === null || item.stock === undefined) return false;
    return item.quantity > item.stock;
  }).length;

  return (
    <div className="flex flex-col gap-4">
      {problematicCount > 0 && (
        <div className="sticky top-[calc(var(--header-height)_+_1px)] z-10 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 shadow-md">
          <p className="font-medium">
            Có {problematicCount} sản phẩm không còn sẵn trong giỏ hàng của bạn.
          </p>
          <p className="mt-1 text-sm">
            Vui lòng chỉnh sửa giỏ hàng của bạn, trước khi nhấn nút &quot;Thanh
            toán&quot;.
          </p>
        </div>
      )}
      <ul className="divide-primary-300 flex flex-col divide-y">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default CartList;
