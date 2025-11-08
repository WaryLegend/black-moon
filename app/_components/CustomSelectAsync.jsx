"use client";

import ReactSelectAsync from "react-select/async";
import makeAnimated from "react-select/animated";
import { useMemo, useState } from "react";

export default function CustomSelectAsync({
  filterField,
  minWidth,
  type = "default",
  loadOptions,
  defaultOptions,
  cacheOptions,
  value,
  onChange,
  isAnimated = false,
  ...props
}) {
  // Store all loaded options { label, value } in a cache by ID
  const [optionCache, setOptionCache] = useState({});

  // Convert value (IDs) → full option objects using the cache
  const selectedOptions = useMemo(() => {
    if (Array.isArray(value)) {
      return value.map((id) => optionCache[id]).filter(Boolean); // only keep options that exist in cache
    }
    return optionCache[value] || null;
  }, [value, optionCache]);

  // Wrap loadOptions to also update the cache
  const cachedLoadOptions = async (inputValue) => {
    const options = await loadOptions(inputValue);
    const newCache = { ...optionCache };
    options.forEach((opt) => {
      newCache[opt.value] = opt; // cache by ID
    });
    setOptionCache(newCache);
    return options;
  };

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
      return {
        ...provided,
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        backgroundColor: state.isSelected
          ? "var(--color-accent-600)"
          : state.isFocused
            ? "var(--color-accent-100)"
            : "white",
        color: state.isSelected
          ? "white"
          : state.isFocused && "var(--color-primary-700)",
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
    <ReactSelectAsync
      instanceId={filterField}
      cacheOptions={cacheOptions}
      defaultOptions={defaultOptions}
      loadOptions={cachedLoadOptions}
      value={selectedOptions}
      onChange={(selected) => {
        const value = Array.isArray(selected)
          ? selected.map((s) => s.value)
          : selected?.value;
        // pass both value and full selected option object
        onChange({
          target: { value },
          option: selected,
        });
      }}
      styles={customStyles}
      components={isAnimated ? makeAnimated() : null}
      noOptionsMessage={({ inputValue }) =>
        inputValue ? "No options found" : "Type any to search"
      }
      {...props}
    />
  );
}
