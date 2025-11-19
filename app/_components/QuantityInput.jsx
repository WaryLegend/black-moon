"use client";

import { FaMinus, FaPlus } from "react-icons/fa";
import { useProductStore } from "@/app/_context/ProductStore";
import { useEffect } from "react";
import Button from "@/app/_components/Button";

function QuantityInput({ defaultValue = 1 }) {
  const quantity = useProductStore((p) => p.quantity);
  const setQuantity = useProductStore((p) => p.setQuantity);
  const maxQuantity = useProductStore((p) => p.selectedVariant()?.stock);

  useEffect(() => {
    setQuantity(defaultValue);
  }, [defaultValue, setQuantity]);

  return (
    <section>
      <div className="bg-primary-100 inline-flex items-center rounded-full px-4 py-2">
        <Button
          icon
          disabled={quantity <= 1}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="hover:text-accent-700 rounded-sm p-3 disabled:opacity-50"
          type="button"
        >
          <FaMinus className="h-3 w-3 transition-all" />
        </Button>
        <span className="px-4 text-center text-lg font-medium">
          {quantity || 1}
        </span>
        <Button
          icon
          disabled={quantity >= maxQuantity}
          onClick={() => setQuantity(quantity + 1)}
          className="hover:text-accent-700 rounded-sm p-3 disabled:opacity-50"
          type="button"
        >
          <FaPlus className="h-3 w-3 transition-all" />
        </Button>
      </div>
    </section>
  );
}

export default QuantityInput;
