// app/_components/InitializeDarkMode.tsx
"use client";

import { useEffect } from "react";
import { useDarkModeStore } from "@/app/_context/DarkModeStore";

export default function InitializeDarkMode() {
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
