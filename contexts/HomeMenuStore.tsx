import { create } from "zustand";

interface MenuState {
  isOpen: boolean;
  activeLink: string;
  toggleMenu: (link: string) => void;
  setActiveLink: (link: string) => void;
  openMenu: (link: string) => void;
  closeMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isOpen: false,
  activeLink: "",
  toggleMenu: (link: string) =>
    set((state) => {
      if (state.activeLink === link) {
        return {
          activeLink: !state.isOpen ? link : "",
          isOpen: !state.isOpen,
        };
      }
      return { activeLink: link, isOpen: true };
    }),
  setActiveLink: (link: string) => set({ activeLink: link }),
  openMenu: (link: string) => set({ isOpen: true, activeLink: link }),
  closeMenu: () => set({ isOpen: false, activeLink: "" }),
}));
