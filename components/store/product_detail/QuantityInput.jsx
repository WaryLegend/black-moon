"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { useProductStore } from "@/contexts/ProductStore";
import { useSettingStore } from "@/contexts/SettingStore";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

function QuantityInput({ defaultValue = 1 }) {
  const quantity = useProductStore((p) => p.quantity);
  const setQuantity = useProductStore((p) => p.setQuantity);
  const inStock = useProductStore((p) => p.selectedVariant()?.stock);
  const limit = useSettingStore((s) => s.settings?.order_limit);

  const prevDefault = useRef(null);
  const prevMaxAllowed = useRef(null);

  if (defaultValue !== prevDefault.current) {
    setQuantity(defaultValue);
    prevDefault.current = defaultValue;
  }

  if (!inStock && inStock !== 0)
    return (
      <Spinner type="mini" color="var(--color-accent-600)" className="mx-2" />
    );

  // check if instock is smaller than limit
  const maxAllowed = Math.min(inStock, limit);

  return (
    <div>
      {inStock > 0 ? (
        <>
          <div className="bg-primary-100 inline-flex items-center rounded-full px-4 py-2">
            <Button
              icon
              disabled={quantity <= 1}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="hover:text-accent-700 rounded-sm p-3 disabled:opacity-50"
              type="button"
            >
              <FaMinus className="h-3 w-3 transition-all not-disabled:hover:scale-110" />
            </Button>
            <span className="px-4 text-center text-lg font-medium">
              {quantity || defaultValue}
            </span>
            <Button
              icon
              disabled={quantity >= maxAllowed}
              onClick={() => setQuantity(quantity + 1)}
              className="hover:text-accent-700 rounded-sm p-3 disabled:opacity-50"
              type="button"
            >
              <FaPlus className="h-3 w-3 transition-all not-disabled:hover:scale-110" />
            </Button>
          </div>
          {inStock <= 10 && (
            <span className="text-primary-400 ml-3">Còn ít hàng</span>
          )}
        </>
      ) : (
        <span className="text-primary-400 md:text-lg lg:text-xl">Hết hàng</span>
      )}
    </div>
  );
}

export default QuantityInput;
