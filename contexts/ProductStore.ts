import { create } from "zustand";

import type {
  ProductDetailSummary,
  ProductVariantSummary,
} from "@/types/products";

type ProductStore = {
  product: ProductDetailSummary | null;
  quantity: number;
  selectedColor: string | null;
  selectedSize: string | null;
  setProduct: (product: ProductDetailSummary | null) => void;
  setColor: (color: string | null) => void;
  setSize: (size: string | null) => void;
  setQuantity: (num: number) => void;
  selectedVariant: () => ProductVariantSummary | null;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  product: null,
  quantity: 1,
  selectedColor: null,
  selectedSize: null,

  setProduct: (product) =>
    set({
      product,
      quantity: 1,
      selectedColor: null,
      selectedSize: null,
    }),

  setColor(color) {
    const product = get().product;
    if (!product) return;

    const variantsForColor = product.variants.filter((v) => v.color === color);
    const sizesForColor = variantsForColor.map((v) => v.size).filter(Boolean);

    const currentSize = get().selectedSize;
    const hasCurrentSize = currentSize
      ? sizesForColor.includes(currentSize)
      : false;
    const newSize = hasCurrentSize ? currentSize : (sizesForColor[0] ?? null);

    set({ selectedColor: color, selectedSize: newSize });
  },

  setSize: (size) => set({ selectedSize: size }),

  setQuantity: (num) => set({ quantity: Math.max(1, num) }),

  selectedVariant: () => {
    const { product, selectedColor, selectedSize } = get();
    if (!product) return null;

    return (
      product.variants.find((v) => {
        const colorMatched = v.color === selectedColor;
        if (!colorMatched) return false;
        if (selectedSize == null) return true;
        return v.size === selectedSize;
      }) ?? null
    );
  },
}));
