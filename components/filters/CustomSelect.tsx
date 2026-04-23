"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import ReactSelect, {
  CSSObjectWithLabel,
  type ActionMeta,
  type MultiValue,
  type SingleValue,
  type StylesConfig,
} from "react-select";
import makeAnimated from "react-select/animated";
import type {
  BaseSelectProps,
  FilterChangeEvent,
  FilterOption,
  FilterValue,
} from "@/types/filter";

type ForwardedSelectProps = Partial<
  Omit<BaseSelectProps, "options" | "value" | "onChange">
>;

type OptionStyle = Partial<Pick<CSSProperties, "color" | "backgroundColor">>;

type CustomSelectProps = ForwardedSelectProps & {
  minWidth?: string | number;
  options: FilterOption[];
  value?: FilterValue;
  controlStyle?: CSSProperties;
  onChange: (event: FilterChangeEvent) => void;
  getOptionStyle?: (value: FilterOption["value"]) => OptionStyle | undefined;
  isAnimated?: boolean;
};

// Narrow union emitted by react-select into a predictable multi-value shape.
function isMultiSelection(
  selection: MultiValue<FilterOption> | SingleValue<FilterOption>,
): selection is MultiValue<FilterOption> {
  return Array.isArray(selection);
}

// CustomSelect wraps the base react-select component so every filter shares the
// same styling, typing, and change-event contract.

function CustomSelect({
  minWidth,
  value,
  options,
  controlStyle,
  onChange,
  getOptionStyle,
  isAnimated = false,
  ...props
}: CustomSelectProps) {
  const {
    isDisabled = false,
    isClearable = false,
    isLoading = false,
    isRtl = false,
    isSearchable = false,
    ...restProps
  } = props;

  const customStyles = useMemo<StylesConfig<FilterOption, boolean>>(
    () => ({
      control: (provided, state) => ({
        ...provided,
        minWidth,
        borderRadius: "0.5rem", // rounded-lg
        fontSize: "0.875rem", // text-sm
        fontWeight: 500, // font-medium
        boxShadow: state.isFocused
          ? "0 0 0 1px var(--color-accent-600)"
          : "none",
        backgroundColor: "var(--color-primary-0)",
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
            transition: "all 200ms ease",
            color: "var(--color-primary-600)",
          };
        return {
          ...provided,
          transition: "all 200ms ease",
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
        transition: "transform 200ms ease",
        transform: state.selectProps.menuIsOpen
          ? "rotate(180deg)"
          : "rotate(0deg)",
      }),
      indicatorSeparator: () => ({ display: "none" }),
    }),
    [getOptionStyle, minWidth, controlStyle],
  );

  const normalizedValue = useMemo(() => {
    if (Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value));
    }
    if (value === null || value === undefined || value === "") return null;
    return options.find((opt) => opt.value === value) ?? null;
  }, [options, value]);

  const animatedComponents = useMemo(
    () => (isAnimated ? makeAnimated() : undefined),
    [isAnimated],
  );

  function emitChange(
    selected: MultiValue<FilterOption> | SingleValue<FilterOption>,
    _actionMeta: ActionMeta<FilterOption>,
  ) {
    const nextValue: FilterValue = isMultiSelection(selected)
      ? selected.map((item) => item.value)
      : (selected?.value ?? null);

    onChange({
      target: {
        value: nextValue,
      },
      option: selected,
    });
  }

  return (
    <ReactSelect
      options={options}
      value={normalizedValue}
      onChange={emitChange}
      styles={customStyles}
      components={animatedComponents}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isLoading={isLoading}
      isRtl={isRtl}
      isSearchable={isSearchable}
      {...restProps}
    />
  );
}

export default CustomSelect;
