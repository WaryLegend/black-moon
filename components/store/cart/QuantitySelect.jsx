"use client";

import { useCartStore } from "@/context/CartStore";
import { useSettingStore } from "@/context/SettingStore";

function QuantitySelect({ id, quantity }) {
  const { getItemStock, updateQuantity } = useCartStore();
  const limit = useSettingStore((s) => s.settings?.order_limit ?? 10);

  // check if item 's stock is smaller than limit
  const itemStock = getItemStock(id);
  const maxAllowed = Math.min(itemStock, limit);

  //find if there's a issue with quantity
  const issueMessage =
    quantity > itemStock
      ? `Chỉ còn ${itemStock} sản phẩm`
      : quantity > limit
        ? `Giới hạn ${limit} sản phẩm`
        : null;

  return (
    <>
      {issueMessage && (
        <span className="block text-sm text-red-600">{issueMessage}</span>
      )}
      <select
        id={`quantity-${id}`}
        value={quantity}
        onChange={(e) => updateQuantity(id, Number(e.target.value))}
        className="border-primary-400 bg-primary-0 rounded-lg border px-2 py-1 text-sm font-medium transition-all"
      >
        {Array.from(
          { length: quantity > maxAllowed ? quantity : maxAllowed },
          (_, i) => i + 1,
        ).map((n) => (
          <option
            key={n}
            value={n}
            className="checked:bg-accent-600 hover:bg-accent-500 bg-primary-50 text-primary-800 checked:text-primary-0"
          >
            {n}
          </option>
        ))}
      </select>
    </>
  );
}

export default QuantitySelect;
