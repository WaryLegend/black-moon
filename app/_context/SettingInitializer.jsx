"use client";

import { useSettingStore } from "@/app/_context/SettingStore";

export default function SettingInitializer({ settings }) {
  const setSettings = useSettingStore((s) => s.setSettings);
  const current = useSettingStore((s) => s.settings);

  if (JSON.stringify(settings) !== JSON.stringify(current)) {
    setSettings(settings);
  }

  return null;
}
