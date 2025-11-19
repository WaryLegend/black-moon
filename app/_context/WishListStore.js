import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

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
            url: variant.url,
          },
        ];
        // Update local first (optimistic UI)
        set({ items: updatedItems });
        // If userId exists → sync with server
        if (userId) {
          try {
            // Example: send to API (implement your own data-service)
            // const serveruser = await addToWishList(userId, variant);
            // set({ items: serveruser, isSynced: true });
          } catch (error) {
            set({ items }); // rollback
            console.error("Sync failed:", error);
            toast.error("Không thể thêm vào yêu thích. Thử lại sau.");
            return;
          }
        }
        toast.success("Đã thêm vào yêu thích", { icon: "🖤" });
      },

      // remove by id
      removeItem: async (id) => {
        const { items, userId } = get();
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
        // If userId exists → sync with server
        if (userId) {
          try {
            // Example: send to API (implement your own data-service)
            // const serveruser = await addToWishList(userId, variant);
            // set({ items: serveruser, isSynced: true });
          } catch (error) {
            set({ items }); // rollback
            console.error("Sync failed:", error);
            toast.error("Không thể xóa khỏi yêu thích. Thử lại sau.");
            return;
          }
        }
        toast.success("Đã xóa khỏi yêu thích");
      },

      // remove by variantId
      removeItemByVariantId: async (id) => {
        const { items, userId } = get();
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== id),
        }));
        // If userId exists → sync with server
        if (userId) {
          try {
            // Example: send to API (implement your own data-service)
            // const serveruser = await addToWishList(userId, variant);
            // set({ items: serveruser, isSynced: true });
          } catch (error) {
            set({ items }); // rollback
            console.error("Sync failed:", error);
            toast.error("Không thể xóa khỏi yêu thích. Thử lại sau.");
            return;
          }
        }
        toast.success("Đã xóa khỏi yêu thích");
      },

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
