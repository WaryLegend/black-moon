"use client";

import { useCartStore } from "@/app/_context/CartStore";
import { useSettingStore } from "@/app/_context/SettingStore";
import CartItem from "@/app/_components/CCartPage/CartItem";
import CartListSkeleton from "@/app/_components/Skeletons/CartListSkeleton";
import NoCartlistFound from "./NoCartlistFound";

function CartList() {
  const items = useCartStore((state) => state.items);
  const isPending = useCartStore((state) => state.isPending);
  const limit = useSettingStore((s) => s.settings?.order_limit ?? 10);

  // 1. Still loading/pending (hydration in progress)
  if (isPending) return <CartListSkeleton />;

  // 2. Hydrated + empty → show empty state
  if (items.length === 0) return <NoCartlistFound />;

  // 3. Tính số lượng sản phẩm "có vấn đề" (vượt limit hoặc vượt stock)
  const problematicItems = items.filter((item) => {
    const currentQty = item.quantity;
    // Vượt giới hạn đặt hàng HOẶC vượt tồn kho → "có vấn đề"
    return currentQty > limit || currentQty > (item.stock || 0);
  });
  const problematicCount = problematicItems.length;

  // 4. Hydrated + has items → show list
  return (
    <div className="flex flex-col gap-4">
      {problematicCount > 0 && (
        <div className="sticky top-[calc(var(--header-height)_+_1px)] z-10 rounded-md border border-red-200 bg-red-50 p-4 text-red-600 shadow-md">
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
