"use client";

import Select from "@/app/_components/CustomSelect";
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

  const initalValue = searchParams.get(filterField) || options[0]?.value;

  function handleChange(e) {
    if (e.target.value === initalValue) return;

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
          value={initalValue} // current active
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default FirstChosenFilter;
