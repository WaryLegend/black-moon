"use client";

import { useCartActions } from "./useCartActions";

type QuantitySelectProps = {
  itemId: number;
  quantity: number;
  variantQuantity: number | null; // number of items in stock for this variant
};

function QuantitySelect({
  itemId,
  quantity,
  variantQuantity,
}: QuantitySelectProps) {
  const limit = 10; // temporary hardcode, will be replaced by setting store later
  const { updateQuantity } = useCartActions();

  const maxAllowed =
    variantQuantity === null || variantQuantity === undefined
      ? limit
      : Math.min(variantQuantity, limit);

  //find if there's a issue with quantity
  const issueMessage =
    variantQuantity !== null &&
    variantQuantity !== undefined &&
    quantity > variantQuantity
      ? `Chỉ còn ${variantQuantity} sản phẩm`
      : quantity > limit
        ? `Giới hạn ${limit} sản phẩm`
        : null;

  return (
    <>
      {issueMessage && (
        <span className="block text-sm text-red-600">{issueMessage}</span>
      )}
      <select
        id={`quantity-${itemId}`}
        value={quantity}
        onChange={(event) => updateQuantity(itemId, Number(event.target.value))}
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
