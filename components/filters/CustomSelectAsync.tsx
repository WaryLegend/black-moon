"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import ReactSelectAsync from "react-select/async";
import makeAnimated from "react-select/animated";
import type {
  CSSObjectWithLabel,
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";
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
type OptionStyle = Partial<Pick<CSSProperties, "color" | "backgroundColor">>;

type CustomSelectAsyncProps = ForwardedAsyncProps & {
  minWidth?: string | number;
  controlStyle?: CSSProperties;
  loadOptions: LoadOptions;
  defaultOptions?: boolean | FilterOption[];
  cacheOptions?: boolean;
  value?: FilterValue;
  onChange: (event: FilterChangeEvent) => void;
  getOptionStyle?: (value: FilterOption["value"]) => OptionStyle | undefined;
  isAnimated?: boolean;
};

const isMultiSelection = (
  selection: MultiValue<FilterOption> | SingleValue<FilterOption> | null,
): selection is MultiValue<FilterOption> => Array.isArray(selection);

// CustomSelectAsync is the async cousin of CustomSelect, caching loaded options
// so we can reconstruct the selected objects from just their primitive values.

export default function CustomSelectAsync({
  minWidth,
  controlStyle,
  loadOptions,
  defaultOptions = true,
  cacheOptions = true,
  value,
  onChange,
  getOptionStyle,
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
        borderColor: "var(--color-accent-300)",
        "&:hover": {
          borderColor: "var(--color-accent-700)",
        },
        outline: state.isFocused ? "1px solid var(--color-accent-600)" : "none",
        outlineOffset: "2px",
        ...((controlStyle as CSSObjectWithLabel) || {}),
      }),
      option: (provided, state) => {
        const custom = getOptionStyle?.(state.data.value) || {};
        return {
          ...provided,
          fontSize: "0.875rem",
          fontWeight: 500,
          cursor: "pointer",
          backgroundColor: state.isSelected
            ? "var(--color-accent-600)"
            : state.isFocused
              ? custom.color || "var(--color-accent-100)"
              : custom.backgroundColor || "var(--color-primary-50)",
          // khi giữ chuột trái vào option
          "&:active": {
            backgroundColor: state.isSelected
              ? "var(--color-accent-800)"
              : "var(--color-accent-200)",
          },
          color: state.isSelected
            ? "var(--color-primary-50)"
            : state.isFocused
              ? state.data.value?.toString().toLowerCase() === "black"
                ? "white"
                : custom.backgroundColor
              : custom.color || "var(--color-primary-700)",
        };
      },
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
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
        zIndex: 20,
        backgroundColor: "var(--color-primary-50)",
      }),
      menuList: (provided) => ({
        ...provided,
        borderRadius: "0.5rem",
      }),
      multiValueLabel: (provided, state) => {
        const custom = getOptionStyle?.(state.data.value) || {};
        return {
          ...provided,
          color: custom.color || "var(--color-primary-900)" || provided.color,
          backgroundColor: "transparent",
        };
      },
      multiValue: (provided, state) => {
        const custom = getOptionStyle?.(state.data.value) || {};
        return {
          ...provided,
          backgroundColor:
            custom.backgroundColor ||
            "var(--color-primary-200)" ||
            provided.backgroundColor,
          borderTopLeftRadius: "0.35rem",
          borderBottomLeftRadius: "0.35rem",
        };
      },
      multiValueRemove: (provided, state) => {
        const custom = getOptionStyle?.(state.data.value);
        if (!custom)
          return {
            ...provided,
            transition: "all 120ms ease",
            color: "var(--color-primary-600)",
          };
        return {
          ...provided,
          transition: "all 120ms ease",
          color: custom.color,
          ":hover": {
            backgroundColor:
              state.data.value?.toString().toLowerCase() !== "white"
                ? custom.color
                : "#5b5b5b",
            color: "white",
          },
        };
      },
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
    [getOptionStyle, minWidth],
  );

  const animatedComponents = useMemo(
    () => (isAnimated ? makeAnimated() : undefined),
    [isAnimated],
  );

  return (
    <ReactSelectAsync
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
