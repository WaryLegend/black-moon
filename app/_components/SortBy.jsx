"use client";

import Select from "@/app/_components/CustomSelect";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function SortBy({ options }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || options[0]?.value;

  function handleChange(e) {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set("sortBy", e.target.value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="flex items-center gap-2 p-1">
        <label htmlFor="sortBy" className="font-semibold">
          Sort by
        </label>
        <Select
          inputId="sortBy"
          minWidth="10rem"
          options={options}
          value={sortBy} // current active
          type="white"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default SortBy;
