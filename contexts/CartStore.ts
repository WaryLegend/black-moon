import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartGuestItem } from "@/types/cart";

type CartState = {
  items: CartGuestItem[];
  isPending: boolean;
  hasMerged: boolean;
  setItems: (items: CartGuestItem[]) => void;
  addItem: (item: CartGuestItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setIsPending: () => void;
  setHasMerged: (value: boolean) => void;
  getTotalTypes: () => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemStock: (id: string) => number;
  getHasIssue: (orderLimit?: number) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isPending: true,
      hasMerged: false,

      setItems: (items) => set({ items }),
      addItem: (item) => {
        const { items } = get();
        const existing = items.find(
          (entry) => entry.variantId === item.variantId,
        );

        if (existing) {
          const nextItems = items.map((entry) =>
            entry.variantId === item.variantId
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
      setHasMerged: (value) => set({ hasMerged: value }),

      getTotalTypes: () => get().items.length,
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      getItemStock: (id) => {
        const { items } = get();
        const item = items.find((entry) => entry.id === id);
        return item?.stock ?? 0;
      },
      getHasIssue: (orderLimit = Infinity) =>
        get().items.some(
          (item) =>
            item.quantity > orderLimit || item.quantity > (item.stock ?? 0),
        ),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        hasMerged: state.hasMerged,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsPending();
        }
      },
    },
  ),
);
