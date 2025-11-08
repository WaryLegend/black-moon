import { create } from "zustand";
import { persist } from "zustand/middleware";

// API functions (sẽ dùng sau)
const api = {
  // Sau này sẽ fetch từ /api/cart
  fetch: async () => {
    // return await fetch("/api/cart").then(r => r.json());
    return null; // tạm thời
  },
  save: async (items) => {
    // await fetch("/api/cart", { method: "POST", body: JSON.stringify(items) });
  },
  merge: async (localItems) => {
    // await fetch("/api/cart/merge", { method: "POST", body: JSON.stringify(localItems) });
  },
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // === ACTIONS ===
      setCart: (items) => set({ items }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // === DERIVED ===
      // Số loại sản phẩm
      getTotalTypes: () => get().items.length,
      // Tổng số lượng sản phẩm
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.sale
            ? item.price * (1 - item.sale / 100)
            : item.price;
          return total + price * item.quantity;
        }, 0),

      // === FUTURE: SYNC WITH SERVER ===
      syncWithServer: async () => {
        const serverCart = await api.fetch();
        if (serverCart) {
          set({ items: serverCart });
        } else {
          // Nếu chưa có cart trên server → push local lên
          await api.save(get().items);
        }
      },

      mergeLocalToServer: async () => {
        await api.merge(get().items);
      },
    }),
    {
      name: "cart-storage", // key trong localStorage
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
