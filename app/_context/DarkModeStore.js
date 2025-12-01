import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDarkModeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,

      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.isDarkMode;

          document.documentElement.classList.toggle("dark-mode", newValue);
          document.documentElement.classList.toggle("light-mode", !newValue);

          return { isDarkMode: newValue };
        }),

      setDarkMode: (value) => {
        if (value) {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.toggle("light-mode");
        }
        set({ isDarkMode: value });
      },
    }),
    { name: "dark-mode" },
  ),
);
