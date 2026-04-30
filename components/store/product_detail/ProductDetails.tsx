"use client";

import { useCallback, useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import Button from "@/components/ui/Button";
import { useProductStore } from "@/contexts/ProductStore";
import type { ProductDescriptionSummary } from "@/types/products";

export default function ProductDetails() {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const product = useProductStore((p) => p.product);

  const details = useMemo(() => {
    const descriptions = product?.descriptions ?? [];
    // 2rd time sort to make sure the order is correct even if the backend already returns sorted data.
    return [...descriptions].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [product?.descriptions]);

  const toggle = useCallback((index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }, []);

  return (
    <div className="grid gap-3">
      <h1 className="text-2xl font-semibold lg:text-3xl">Mô tả</h1>
      {product?.baseSku ? (
        <p className="text-primary-700 text-sm">
          Mã sản phẩm: {product.baseSku}
        </p>
      ) : null}

      {!details.length ? (
        <p className="text-primary-700 text-sm">
          Chưa có mô tả cho sản phẩm này.
        </p>
      ) : (
        <div className="divide-primary-300 border-primary-400 flex flex-col divide-y border-t text-lg">
          {details.map((item: ProductDescriptionSummary, index: number) => (
            <div key={item.id ?? `${item.title}-${index}`} className="py-4">
              <div className="inline-flex w-full items-center justify-between gap-3">
                <p
                  className={openIndices.includes(index) ? "font-semibold" : ""}
                >
                  {item.title}
                </p>
                <Button
                  icon
                  onClick={() => toggle(index)}
                  className="hover:text-accent-700"
                >
                  {openIndices.includes(index) ? (
                    <FaMinus className="h-3 w-3 transition-all" />
                  ) : (
                    <FaPlus className="h-3 w-3 transition-all" />
                  )}
                </Button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndices.includes(index)
                    ? "max-h-[500px] overflow-y-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="prose prose-sm prose-p:text-primary-700 prose-headings:text-primary-800 prose-strong:text-primary-800 prose-a:text-accent-600 max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
