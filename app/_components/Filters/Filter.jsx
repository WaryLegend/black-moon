"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Select from "@/app/_components/CustomSelect";

function Filter({
  filterField,
  options,
  selectProps = {},
  onFilterChange,
  value: propValue,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Use provided value if in deferred mode (onFilterChange), otherwise from params
  const currentFilter = onFilterChange
    ? propValue
    : selectProps.isMulti
      ? (searchParams.get(filterField)?.split(",") ?? [])
      : searchParams.get(filterField) || "";

  function handleChange(event) {
    const value = event.target.value; // string or array

    // If onFilterChange is provided (from SideFilter), update local state
    if (onFilterChange) {
      onFilterChange(filterField, value);
      return;
    }

    // Otherwise, update URL directly (for NestedFilter in ProductFilter)
    const params = new URLSearchParams(searchParams.toString());

    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(filterField);
    } else if (Array.isArray(value)) {
      params.set(filterField, value.join(","));
    } else {
      params.set(filterField, value);
    }

    // If page param exists
    if (params.get("page")) params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      inputId={filterField}
      options={options}
      value={currentFilter}
      onChange={handleChange}
      {...selectProps}
    />
  );
}

export default Filter;
