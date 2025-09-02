import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isOpen: false,
  activeLink: "",
  toggleMenu: (link) =>
    set((state) => {
      if (state.activeLink === link) {
        // If clicking same link, toggle open/close
        return {
          isOpen: !state.isOpen,
          activeLink: !state.isOpen ? link : "",
        };
      }
      // If different link, always open
      return { isOpen: true, activeLink: link };
    }),
  setActiveLink: (link) => set({ activeLink: link }),
  //use for click outside
  closeMenu: () => set({ isOpen: false, activeLink: "" }),
}));
