"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

type ToggleSwitchProps = {
  value?: boolean;
  onLabel?: string;
  offLabel?: string;
  defaultValue?: boolean;
  onChange?: (nextValue: boolean) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

function ToggleSwitch({
  value,
  onLabel = "On",
  offLabel = "Off",
  defaultValue = false,
  onChange,
  disabled = false,
  className = "",
  ariaLabel = "Toggle switch",
}: ToggleSwitchProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    isControlled ? Boolean(value) : Boolean(defaultValue),
  );

  useEffect(() => {
    if (!isControlled) return;
    setInternalValue(Boolean(value));
  }, [isControlled, value]);

  const currentValue = isControlled ? Boolean(value) : internalValue;

  function handleToggle(nextValue: boolean) {
    if (disabled) return;
    if (!isControlled) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <div
      className={cn(
        "border-primary-200 bg-primary-50 flex w-fit gap-1 rounded-lg border p-1.5 shadow-sm",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => handleToggle(true)}
        disabled={disabled}
        className={`rounded-md px-3 py-1 text-sm font-medium transition-all duration-300 ${
          currentValue
            ? "text-primary-0 bg-emerald-600"
            : "bg-primary-50 text-primary-700 hover:bg-primary-100"
        }`}
      >
        {onLabel}
      </button>
      <button
        type="button"
        onClick={() => handleToggle(false)}
        disabled={disabled}
        className={`rounded-md px-3 py-1 text-sm font-medium transition-all duration-300 ${
          !currentValue
            ? "text-primary-0 bg-red-600"
            : "bg-primary-50 text-primary-700 hover:bg-primary-100"
        }`}
      >
        {offLabel}
      </button>
    </div>
  );
}

export default ToggleSwitch;
