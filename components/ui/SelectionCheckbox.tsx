"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/utils/cn";

type SelectionCheckboxProps = {
  id?: string;
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  onChange: (checked: boolean) => void;
};

export default function SelectionCheckbox({
  id,
  checked,
  indeterminate = false,
  disabled = false,
  ariaLabel,
  className,
  onChange,
}: SelectionCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? `selection-checkbox-${generatedId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={inputRef}
      id={inputId}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.checked)}
      className={cn(
        "accent-accent-600 border-primary-400 h-4 w-4 cursor-pointer rounded border",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}
