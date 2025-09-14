"use client";

import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

function CustomSelect({
  inputId,
  minWidth,
  value,
  options,
  onChange,
  type = "default",
  isDisabled = false,
  isClearable = false,
  isLoading = false,
  isRtl = false, // reversed side
  isSearchable = false,
  isAnimated = false,
  getOptionStyle,
  ...props
}) {
  // react-select custom styles
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: minWidth,
      borderRadius: "0.375rem", // rounded-md
      fontSize: "0.875rem", // text-sm
      fontWeight: 500, // font-medium
      boxShadow: state.isFocused ? "0 0 0 1px var(--color-accent-600)" : "none",
      borderColor: state.isFocused
        ? "var(--color-accent-300)"
        : type === "white"
          ? "var(--color-accent-200)"
          : "var(--color-accent-300)",
      "&:hover": {
        borderColor: "var(--color-accent-700)",
      },
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
            ? custom.backgroundColor || "var(--color-accent-100)"
            : "white",
        color: state.isSelected
          ? "white"
          : state.isFocused
            ? state.data.value === "black"
              ? "white"
              : custom.color
            : (state.data.value !== "white" && custom.color) ||
              "var(--color-primary-700)",
      };
    },
    singleValue: (provided) => {
      return {
        ...provided,
        color: "var(--color-primary-700)",
      };
    },
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      zIndex: 20,
    }),
    multiValueLabel: (provided, state) => {
      const custom = getOptionStyle?.(state.data.value) || {};
      return {
        ...provided,
        color:
          state.data.value === "black"
            ? "white"
            : custom.color || provided.color,
        backgroundColor: custom.backgroundColor,
      };
    },
    multiValueRemove: (provided, state) => {
      const custom = getOptionStyle?.(state.data.value);
      if (!custom)
        return {
          ...provided,
        };
      return {
        ...provided,
        color: custom.color,
        backgroundColor: custom.backgroundColor,
        ":hover": {
          backgroundColor:
            state.data.value !== "white" ? custom.color : "#5b5b5b",
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
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <ReactSelect
      inputId={inputId}
      instanceId={inputId}
      options={options}
      value={
        Array.isArray(value)
          ? options.filter((opt) => value.includes(opt.value)) // multi
          : options.find((opt) => opt.value === value) // single
      }
      onChange={(selected) =>
        onChange({
          target: {
            value: Array.isArray(selected)
              ? selected.map((s) => s.value) // return array
              : selected?.value, // return single
          },
        })
      }
      styles={customStyles}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isClearable={isClearable}
      isRtl={isRtl}
      isSearchable={isSearchable}
      components={isAnimated ? makeAnimated() : null}
      {...props}
    />
  );
}

export default CustomSelect;
