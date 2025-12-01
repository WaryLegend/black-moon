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
                stock: variant.stock,
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
      // get real time stock of an item in cart
      getItemStock: (id) => {
        const { items } = get();
        if (items.length === 0) return;
        const item = items.find((i) => i.id === id);
        return item?.stock ?? 0;
      },

      refreshAllStocks: async () => {
        const { items } = get();
        if (items.length === 0) return;

        const variantIds = items.map((i) => i.variantId).join(",");

        try {
          // const res = await fetch(`/api/products/stock?ids=${variantIds}`);
          // if (!res.ok) throw new Error("Stock fetch failed");
          // const stockMap = await res.json();

          let adjusted = false;

          set({
            items: items.map((item) => {
              const newStock = stockMap[item.variantId] ?? item.stock;
              if (newStock < item.stock) adjusted = true;

              if (item.quantity > newStock) {
                adjusted = true;
                return { ...item, stock: newStock, quantity: newStock };
              }
              return { ...item, stock: newStock };
            }),
          });

          if (adjusted) {
            toast.warn("Một số sản phẩm gần hết hàng, đã điều chỉnh số lượng");
          }
        } catch (err) {
          console.error("refreshAllStocks failed:", err);
          toast.error("Không thể cập nhật tồn kho");
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
      // clear cart
      clearCart: () => set({ items: [] }),

      // === DERIVED ===
      // Số loại sản phẩm
      getTotalTypes: () => get().items.length,
      // Tổng số lượng sản phẩm
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      // Tìm lỗi về số lượng có vượt limit hay stock
      getHasIssue: (orderLimit = Infinity) =>
        get().items.some(
          (item) =>
            item.quantity > orderLimit || item.quantity > (item.stock || 0),
        ),
      // Tổng tiền của giỏ hàng
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
