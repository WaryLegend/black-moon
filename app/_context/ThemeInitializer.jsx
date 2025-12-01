"use client";

import { useEffect } from "react";
import { useDarkModeStore } from "@/app/_context/DarkModeStore";

export default function ThemeInitializer() {
  const { setDarkMode } = useDarkModeStore();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const saved = localStorage.getItem("dark-mode");

    let initialMode;

    if (saved !== null) {
      initialMode = JSON.parse(saved).state.isDarkMode;
    } else {
      initialMode = prefersDark;
    }

    setDarkMode(initialMode);
  }, [setDarkMode]);

  return null;
}
