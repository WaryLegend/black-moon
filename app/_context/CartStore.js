import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  // Initialize cart
  setCart: (items) => set({ items }),

  // Update quantity of one item
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    })),

  // Remove item
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Derived: calculate total price
  getTotalPrice: () =>
    get().items.reduce((total, item) => {
      const price = item.sale ? item.price * (1 - item.sale / 100) : item.price;
      return total + price * item.quantity;
    }, 0),
}));
