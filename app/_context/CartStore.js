import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      isSynced: false,
      isPending: true,

      // === ACTIONS ===
      setCart: (items) => set({ items }),
      setCartId: (id) => set({ cartId: id }),
      // flag for hydrating state (loading, pending,...)
      setIsPending: () => set({ isPending: false }),
      // Add or increase quantity
      addItem: async (variant) => {
        const { cartId, items } = get();
        // find if variant already exists
        const existing = items.find((i) => i.variantId === variant.variantId);
        // Build updated list (optimistic update)
        const updatedItems = existing
          ? items.map((i) =>
              i.variantId === variant.variantId
                ? { ...i, quantity: i.quantity + (variant.quantity || 1) }
                : i,
            )
          : [
              ...items,
              {
                id: crypto.randomUUID(),
                variantId: variant.variantId,
                name: variant.name,
                variantPrice: variant.variantPrice,
                color: variant.color,
                size: variant.size,
                sku: variant.sku,
                quantity: variant.quantity || 1,
                image: variant.image,
                url: variant.url,
              },
            ];
        // Update local first (optimistic UI)
        set({ items: updatedItems });

        // If cartId exists → sync with server
        if (cartId) {
          try {
            // Example: send to API (implement your own data-service)
            // const serverCart = await addCartItem(cartId, variant);
            // set({ items: serverCart, isSynced: true });
          } catch (error) {
            set({ items }); // rollback
            console.error("Cart sync failed:", error);
            toast.error("Không thể thêm vào giỏ hàng. Thử lại sau.");
            return;
          }
        }
        toast.success("Đã thêm vào giỏ hàng", { icon: "🛒" });
      },

      // Update
      updateQuantity: async (id, quantity) => {
        const { items, cartId } = get();
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });

        if (cartId) {
          try {
            // await updateCartItem(cartId, variantId, quantity);
          } catch (error) {
            console.error("Update quantity failed:", error);
            set({ items }); // rollback
          }
        }
      },
      // remove
      removeItem: async (id) => {
        const { items, cartId } = get();
        set({
          items: items.filter((item) => item.id !== id),
        });
        if (cartId) {
          try {
            // await removeCartItem(cartId, variantId);
          } catch (error) {
            set({ items }); // rollback
            console.error("Remove item failed:", error);
            toast.error("Không thể thêm vào giỏ hàng. Thử lại sau.");
            return;
          }
        }
        toast.success("Đã gỡ khỏi giỏ hàng");
      },
      // user log out
      resetCart: () => set({ items: [], cartId: null, isSynced: false }),

      // === DERIVED ===
      // Số loại sản phẩm
      getTotalTypes: () => get().items.length,
      // Tổng số lượng sản phẩm
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => {
          const price = item.sale
            ? item.variantPrice * (1 - item.sale / 100)
            : item.variantPrice;
          return total + price * item.quantity;
        }, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items, cartId: state.cartId }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsPending();
        }
      },
    },
  ),
);
