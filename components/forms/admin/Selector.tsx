import type { SelectHTMLAttributes } from "react";

type SelectorOption = {
  value: string | number;
  label: string;
};

type SelectorProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options?: SelectorOption[];
  placeholder?: string | null;
};

export default function Selector({
  options = [],
  placeholder = "Chọn giá trị",
  className = "",
  ...props
}: SelectorProps) {
  const normalized = options.map((option) => ({
    value: option.value,
    label: option.label ?? String(option.value),
  }));

  return (
    <select
      className={`border-accent-300 bg-primary-0 disabled:bg-primary-300 rounded-lg border px-3 py-2 font-sans shadow-sm ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" className="text-primary-400">
          {placeholder}
        </option>
      )}
      {normalized.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
