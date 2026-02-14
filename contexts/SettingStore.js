import { create } from "zustand";

export const useSettingStore = create((set) => ({
  settings: {},
  setSettings: (s) => set({ settings: s }),
}));
