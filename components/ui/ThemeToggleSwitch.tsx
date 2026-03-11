"use client";

import { useDarkModeStore } from "@/contexts/DarkModeStore";
import { cn } from "@/utils/cn";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

export default function ThemeToggleSwitch() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  return (
    <button
      type="button"
      title={`Turn ${isDarkMode ? "off" : "on"} dark mode`}
      onClick={(e) => {
        e.stopPropagation(); // Ngăn menu đóng ngay lập tức
        toggleDarkMode();
      }}
      className="text-primary-600 hover:bg-primary-100 flex w-full items-center justify-between rounded-sm px-6 py-2.5 text-left text-base transition disabled:opacity-50"
    >
      <div className="flex items-center gap-4">
        <div className="text-primary-400">
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </div>
        <span className="text-base font-normal">Chế độ tối</span>
      </div>

      {/* Cấu trúc "Công tắc gạt" */}
      <div
        className={cn(
          "relative h-6 w-11 self-end rounded-full transition-colors duration-200",
          isDarkMode ? "bg-accent-500" : "bg-primary-300",
        )}
      >
        <div
          className={cn(
            "bg-primary-50 absolute top-1 left-1 h-4 w-4 rounded-full transition-transform duration-200",
            isDarkMode ? "translate-x-5" : "translate-x-0",
          )}
        />
      </div>
    </button>
  );
}
