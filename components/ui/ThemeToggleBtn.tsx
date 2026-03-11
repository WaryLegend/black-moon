"use client";

import { useDarkModeStore } from "@/contexts/DarkModeStore";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import Button from "@/components/ui/Button";

export default function ThemeToggleBtn() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  return (
    <Button
      icon
      type="button"
      onClick={toggleDarkMode}
      title={`Turn ${isDarkMode ? "off" : "on"} dark mode`}
      className="hover:text-accent-700 rounded-full font-bold"
    >
      {isDarkMode ? (
        <HiOutlineSun className="h-6 w-6" />
      ) : (
        <HiOutlineMoon className="h-6 w-6" />
      )}
    </Button>
  );
}
