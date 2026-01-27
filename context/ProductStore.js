import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  product: null,
  quantity: null,
  selectedColor: null,
  selectedSize: null,

  // === ACTIONS ===
  setProduct: (product) => set({ product }),

  // --- UPDATE COLOR ---
  setColor(color) {
    const product = get().product;
    if (!product) return;

    const sizesForColor = product.variants
      .filter((v) => v.color === color)
      .map((v) => v.size);

    const currentSize = get().selectedSize;
    const newSize = sizesForColor.includes(currentSize)
      ? currentSize
      : (sizesForColor[0] ?? null);

    set({
      selectedColor: color,
      selectedSize: newSize,
    });
  },

  // --- UPDATE SIZE ---
  setSize: (size) => set({ selectedSize: size }),

  // --- SET quantity
  setQuantity: (num) => set({ quantity: num }),
  // --- GET CURRENT VARIANT ---
  selectedVariant: () => {
    const { product, selectedColor, selectedSize } = get();
    if (!product) return null;

    return product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize,
    );
  },
}));
