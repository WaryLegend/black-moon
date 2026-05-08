import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GuestCartItem } from "@/types/cart";

type CartState = {
  items: GuestCartItem[];
  isPending: boolean;
  setItems: (items: GuestCartItem[]) => void;
  addItem: (item: GuestCartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  setIsPending: () => void;
  getTotalTypes: () => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemVariantQuantity: (id: number) => number | null;
  getHasIssue: (orderLimit?: number) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isPending: true,

      setItems: (items) => set({ items }),
      addItem: (item) => {
        const { items } = get();
        const existing = items.find((entry) => entry.id === item.id);

        if (existing) {
          const nextItems = items.map((entry) =>
            entry.id === item.id
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry,
          );
          set({ items: nextItems });
          return;
        }

        set({ items: [...items, item] });
      },
      updateQuantity: (id, quantity) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },
      removeItem: (id) => {
        const { items } = get();
        set({ items: items.filter((item) => item.id !== id) });
      },
      clearCart: () => set({ items: [] }),
      setIsPending: () => set({ isPending: false }),

      getTotalTypes: () => get().items.length,
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0,
        ),
      getItemVariantQuantity: (id) => {
        const { items } = get();
        const item = items.find((entry) => entry.id === id);
        return item?.variant.quantity ?? null;
      },
      getHasIssue: (orderLimit = Infinity) =>
        get().items.some((item) => {
          const variantQuantity = item.variant.quantity;
          return (
            item.quantity > orderLimit ||
            (variantQuantity !== null &&
              variantQuantity !== undefined &&
              item.quantity > variantQuantity)
          );
        }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsPending();
        }
      },
    },
  ),
);
