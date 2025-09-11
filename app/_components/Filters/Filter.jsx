"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Select from "@/app/_components/CustomSelect";

function Filter({ filterField, options, selectProps = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // get from params
  const raw = searchParams.get(filterField);
  const currentFilter = selectProps.isMulti
    ? (raw?.split(",") ?? []) // multi -> array
    : raw || ""; // single -> string

  function handleChange(event) {
    const value = event.target.value; // string or array
    const params = new URLSearchParams(searchParams.toString());

    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(filterField);
    } else if (Array.isArray(value)) {
      params.set(filterField, value.join(",")); // store as comma string
    } else {
      params.set(filterField, value);
    }

    // if page param exist
    if (params.get("page")) params.set("page", 1);

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
