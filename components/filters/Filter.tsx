"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getTextColorStyle } from "@/utils/text.color";
import type {
  FilterChangeEvent,
  FilterOption,
  FilterSelectProps,
  FilterValue,
} from "@/types/filter";
import Select from "./CustomSelect";
import AsyncSelect from "./CustomSelectAsync";

type FilterProps = {
  filterField: string;
  options?: FilterOption[];
  selectProps?: FilterSelectProps;
  onFilterChange?: (field: string, value: FilterValue) => void;
  value?: FilterValue;
  loadOptions?: (inputValue: string) => Promise<FilterOption[]>;
};

// Filter decides whether to render a sync or async select and keeps URL params in sync.

function Filter({
  filterField,
  options,
  selectProps = {},
  onFilterChange,
  value: propValue,
  loadOptions,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isMulti, isAsync, ...forwardedSelectProps } = selectProps;
  const resolvedOptions = options ?? [];
  const isColorFilter = /colou?rs?$/i.test(filterField);

  // Use provided value if in deferred mode (onFilterChange), otherwise from params
  const currentFilter: FilterValue = onFilterChange
    ? (propValue ?? (isMulti ? [] : ""))
    : isMulti
      ? (searchParams.get(filterField)?.split(",") ?? [])
      : searchParams.get(filterField) || "";

  // Apply option coloring for color-related filter fields.
  const enhancedSelectProps = {
    ...forwardedSelectProps,
    isMulti,
    ...(isColorFilter && {
      getOptionStyle: (option: FilterOption["value"]) => {
        return getTextColorStyle(String(option)).style;
      },
    }),
  };

  // Normalize react-select change events into FilterChangeEvent
  function handleChange(event: FilterChangeEvent) {
    const value = event.target.value;
    // If onFilterChange is provided (from SideFilter), update local state
    if (onFilterChange) {
      onFilterChange(filterField, value);
      return;
    }
    // Otherwise, update URL directly (for runtime NestedFilter in ProductFilter)
    const params = new URLSearchParams(searchParams.toString());

    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(filterField);
    } else if (Array.isArray(value)) {
      params.set(filterField, value.join(","));
    } else {
      params.set(filterField, String(value));
    }

    // If page param exists
    if (params.get("page")) params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Render async select when configured via selectProps
  if (isAsync) {
    if (!loadOptions) {
      throw new Error(`Missing loadOptions for async filter: ${filterField}`);
    }
    return (
      <AsyncSelect
        filterField={filterField}
        loadOptions={loadOptions}
        defaultOptions={true}
        cacheOptions
        value={currentFilter}
        onChange={handleChange}
        {...enhancedSelectProps}
      />
    );
  }

  // Fallback to synchronous select for simple option arrays
  return (
    <Select
      inputId={filterField}
      options={resolvedOptions}
      value={currentFilter}
      onChange={handleChange}
      {...enhancedSelectProps}
    />
  );
}

export default Filter;
