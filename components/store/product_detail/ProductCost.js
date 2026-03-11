"use client";

import { useProductStore } from "@/contexts/ProductStore";
import { formatCurrency } from "@/utils/currency";

export default function ProductCost() {
  const variantPrice = useProductStore(
    (v) => v.selectedVariant()?.variantPrice,
  );

  if (!variantPrice) return null;

  // test
  const sale = 1;
  const isNew = true;
  const finalPrice = variantPrice * (1 - sale / 100);

  return (
    <div>
      {/* Default Price */}
      <span
        className={
          sale > 0
            ? "text-primary-400 line-through"
            : "text-xl font-bold lg:text-2xl"
        }
      >
        {formatCurrency(variantPrice)}
      </span>

      {/* Sale? */}
      {sale > 0 && (
        <div>
          <span className="text-xl font-bold text-green-600 lg:text-2xl">
            {formatCurrency(finalPrice)}
          </span>
          <span className="ml-3 text-green-600">Sale</span>
        </div>
      )}
      {/*New? */}
      {isNew && <div className="mt-1 font-semibold lg:text-xl">NEW</div>}
    </div>
  );
}
