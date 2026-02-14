import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeSource = "system" | "user";

export interface DarkModeState {
  isDarkMode: boolean;
  source: ThemeSource;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean, source?: ThemeSource) => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      source: "system",

      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.isDarkMode;

          document.documentElement.classList.toggle("dark-mode", newValue);
          document.documentElement.classList.toggle("light-mode", !newValue);

          return {
            isDarkMode: newValue,
            source: "user",
          };
        }),

      setDarkMode: (value, source: ThemeSource = "system") => {
        document.documentElement.classList.toggle("dark-mode", value);
        document.documentElement.classList.toggle("light-mode", !value);

        set({
          isDarkMode: value,
          source,
        });
      },
    }),
    {
      name: "dark-mode",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        source: state.source,
      }),
    },
  ),
);
