"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactSelectAsync from "react-select/async";
import makeAnimated from "react-select/animated";
import type { MultiValue, SingleValue, StylesConfig } from "react-select";
import type {
  BaseAsyncSelectProps,
  FilterChangeEvent,
  FilterOption,
  FilterValue,
} from "@/types/filter";

type ForwardedAsyncProps = Partial<
  Omit<
    BaseAsyncSelectProps,
    "loadOptions" | "value" | "onChange" | "defaultOptions" | "cacheOptions"
  >
>;

type LoadOptions = (inputValue: string) => Promise<FilterOption[]>;

type CustomSelectAsyncProps = ForwardedAsyncProps & {
  filterField: string;
  minWidth?: string | number;
  loadOptions: LoadOptions;
  defaultOptions?: boolean | FilterOption[];
  cacheOptions?: boolean;
  value?: FilterValue;
  onChange: (event: FilterChangeEvent) => void;
  isAnimated?: boolean;
};

const isMultiSelection = (
  selection: MultiValue<FilterOption> | SingleValue<FilterOption> | null,
): selection is MultiValue<FilterOption> => Array.isArray(selection);

// CustomSelectAsync is the async cousin of CustomSelect, caching loaded options
// so we can reconstruct the selected objects from just their primitive values.

export default function CustomSelectAsync({
  filterField,
  minWidth,
  loadOptions,
  defaultOptions = true,
  cacheOptions = true,
  value,
  onChange,
  isAnimated = false,
  ...props
}: CustomSelectAsyncProps) {
  const [optionCache, setOptionCache] = useState<Record<string, FilterOption>>(
    {},
  );

  useEffect(() => {
    if (!Array.isArray(defaultOptions) || !defaultOptions.length) return;

    setOptionCache((prev) => {
      const next = { ...prev };
      defaultOptions.forEach((opt) => {
        next[String(opt.value)] = opt;
      });
      return next;
    });
  }, [defaultOptions]);

  const selectedOptions = useMemo<
    SingleValue<FilterOption> | MultiValue<FilterOption>
  >(() => {
    if (Array.isArray(value)) {
      return value
        .map((id) => optionCache[String(id)])
        .filter(Boolean) as FilterOption[];
    }
    if (value === null || value === undefined || value === "") return null;
    return optionCache[String(value)] ?? null;
  }, [value, optionCache]);

  const cachedLoadOptions = useCallback<LoadOptions>(
    async (inputValue) => {
      const options = await loadOptions(inputValue);
      setOptionCache((prev) => {
        const next = { ...prev };
        options.forEach((opt) => {
          next[String(opt.value)] = opt;
        });
        return next;
      });
      return options;
    },
    [loadOptions],
  );

  const customStyles = useMemo<StylesConfig<FilterOption, boolean>>(
    () => ({
      control: (provided, state) => ({
        ...provided,
        minWidth,
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        boxShadow: state.isFocused
          ? "0 0 0 1px var(--color-accent-600)"
          : "none",
        backgroundColor: state.isDisabled
          ? "var(--color-primary-300)"
          : "var(--color-primary-0)",
        cursor: state.isDisabled ? "not-allowed" : "pointer",
        borderColor: state.isFocused
          ? "var(--color-accent-400)"
          : "var(--color-accent-300)",
        "&:hover": {
          borderColor: "var(--color-accent-700)",
        },
      }),
      option: (provided, state) => ({
        ...provided,
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        backgroundColor: state.isSelected
          ? "var(--color-accent-600)"
          : state.isFocused
            ? "var(--color-accent-100)"
            : "var(--color-primary-50)",
        color: state.isSelected
          ? "var(--color-primary-50)"
          : state.isFocused
            ? "var(--color-primary-700)"
            : provided.color,
      }),
      input: (provided, state) => ({
        ...provided,
        color: "var(--color-primary-900)",
        cursor: state.isDisabled ? "not-allowed" : "text",
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "var(--color-primary-700)",
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: "0.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 20,
        backgroundColor: "var(--color-primary-50)",
      }),
      menuList: (provided) => ({
        ...provided,
        borderRadius: "0.5rem",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        transition: "all 120ms ease",
        color: "var(--color-gray-600)",
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: state.isFocused
          ? "var(--color-accent-600)"
          : "var(--color-accent-400)",
        "&:hover": { color: "var(--color-accent-600)" },
        transition: "transform 150ms ease",
        transform: state.selectProps.menuIsOpen
          ? "rotate(180deg)"
          : "rotate(0deg)",
      }),
      indicatorSeparator: () => ({ display: "none" }),
    }),
    [minWidth],
  );

  const animatedComponents = useMemo(
    () => (isAnimated ? makeAnimated() : undefined),
    [isAnimated],
  );

  return (
    <ReactSelectAsync
      instanceId={filterField}
      cacheOptions={cacheOptions}
      defaultOptions={defaultOptions}
      loadOptions={cachedLoadOptions}
      value={selectedOptions}
      onChange={(selected) => {
        const nextValue: FilterValue = isMultiSelection(selected)
          ? selected.map((s) => s.value)
          : (selected?.value ?? null);
        onChange({
          target: { value: nextValue },
          option: selected,
        });
      }}
      styles={customStyles}
      components={animatedComponents}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "No options found" : "Type any to search"
      }
      {...props}
    />
  );
}
