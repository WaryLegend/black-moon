"use client";

import Select from "./CustomSelect";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function FirstChosenFilter({
  options,
  filterField,
  label = "",
  className = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialValue = searchParams.get(filterField) || options[0]?.value;

  function handleChange(e) {
    if (e.target.value === initialValue) return;

    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set(filterField, e.target.value);
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
