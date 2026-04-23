"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { FilterChangeEvent, FilterOption } from "@/types/filter";
import Select from "./CustomSelect";

type FirstChosenFilterProps = {
  options: FilterOption[];
  filterField: string;
  label?: string;
  className?: string;
};

// FirstChosenFilter keeps the first option selected by default and updates the URL on change.
function FirstChosenFilter({
  options,
  filterField,
  label = "",
  className = "",
}: FirstChosenFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get(filterField) || options[0]?.value;

  function handleChange(event: FilterChangeEvent) {
    if (event.target.value === initialValue) return;

    const params = new URLSearchParams(searchParams.toString());

    const nextValue = event.target.value;

    if (typeof nextValue === "string" && nextValue.length > 0) {
      params.set(filterField, nextValue);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <div className={`flex items-center gap-2 p-1 ${className}`}>
        <label htmlFor={filterField} className="font-semibold">
          {label}
        </label>
        <Select
          inputId={filterField}
          instanceId={filterField}
          minWidth="10rem"
          options={options}
          value={initialValue}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default FirstChosenFilter;
