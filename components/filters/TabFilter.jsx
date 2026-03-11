"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

function TabFilter({ filterField, options }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(filterField, value);

    // reset page param if exists
    if (params.get("page")) params.set("page", 1);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border-primary-200 bg-primary-50 flex gap-1 rounded-lg border p-1.5 shadow-sm">
      {options.map((option) => {
        const isActive = option.value === currentFilter;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={isActive}
            className={`rounded-md px-2 py-1 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-accent-600 text-accent-50 !pointer-events-none"
                : "bg-primary-50 hover:bg-accent-500 hover:text-primary-0"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabFilter;
