import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishListStore = create(
  persist(
    (set, get) => ({
      items: [],
      userId: null,
      isPending: true,

      // === ACTIONS ===
      setWishList: (items) => set({ items }),
      setUserId: (id) => set({ userId: id }),
      // flag for hydrating state (loading, pending,...)
      setIsPending: () => set({ isPending: false }),
      // add
      addItem: async (variant) => {
        const { items, userId } = get();
        // Build updated list (optimistic update)
        const updatedItems = [
          ...items,
          {
            id: crypto.randomUUID(),
            variantId: variant.variantId,
            name: variant.name,
            variantPrice: variant.variantPrice,
            color: variant.color,
            size: variant.size,
            sku: variant.sku,
            image: variant.image,
          },
        ];
        // Update local first (optimistic UI)
        set({ items: updatedItems });

        // If userId exists → sync with server
        if (userId) {
          try {
            // Example: send to API (implement your own data-service)
            // const serveruser = await adduserItem(userId, variant);
            // set({ items: serveruser, isSynced: true });
          } catch (error) {
            console.error("user sync failed:", error);
            set({ items }); // rollback
          }
        }
      },
      // remove
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      // === DERIVED ===
      // Số loại sản phẩm
      getTotalTypes: () => get().items.length,
    }),
    {
      name: "wishlist-storage", // key trong localStorage
      partialize: (state) => ({ items: state.items, userId: state.userId }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsPending();
        }
      },
    },
  ),
);
