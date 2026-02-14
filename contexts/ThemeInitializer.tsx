"use client";

import { useEffect } from "react";
import { useDarkModeStore } from "@/contexts/DarkModeStore";

export default function ThemeInitializer() {
  const { setDarkMode } = useDarkModeStore();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = localStorage.getItem("dark-mode");

    if (saved) {
      const parsed = JSON.parse(saved)?.state;
      if (parsed?.source === "user") {
        setDarkMode(parsed.isDarkMode, "user");
        return;
      }
    }
    // no user choice → follow system
    setDarkMode(media.matches, "system");

    const listener = (e: MediaQueryListEvent) =>
      setDarkMode(e.matches, "system");
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [setDarkMode]);

  return null;
}
