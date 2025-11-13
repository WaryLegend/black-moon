import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isOpen: false,
  activeLink: "",
  toggleMenu: (link) =>
    set((state) => {
      if (state.activeLink === link) {
        // If clicking same link, toggle open/close
        return {
          activeLink: !state.isOpen ? link : "",
          isOpen: !state.isOpen,
        };
      }
      // If different link, always open
      return { activeLink: link, isOpen: true };
    }),
  setActiveLink: (link) => set({ activeLink: link }),
  openMenu: (link) => set({ isOpen: true, activeLink: link }),
  closeMenu: () => set({ isOpen: false, activeLink: "" }),
}));
