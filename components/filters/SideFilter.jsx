"use client";

import { IoClose, IoFilter } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";
import NestedFilter from "./NestedFilter";

function SideFilter({ filters }) {
  const [isOpenSideFilter, setIsOpenSideFilter] = useState(false);
  const [localFilters, setLocalFilters] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize local filters when sidebar opens
  useEffect(() => {
    if (isOpenSideFilter) {
      const initialFilters = {};
      filters.forEach((fil) => {
        const raw = searchParams.get(fil.filterField);
        initialFilters[fil.filterField] = fil.selectProps?.isMulti
          ? raw
            ? raw.split(",")
            : []
          : raw || "";
      });

      setLocalFilters(initialFilters);
    }
  }, [isOpenSideFilter, searchParams, filters]);

  // Calculate active filters for display (based on applied URL params)
  const activeFilters = filters.reduce((acc, fil) => {
    const value = searchParams.get(fil.filterField);
    if (!value) return acc;

    if (fil.selectProps?.isMulti) {
      const values = value.split(",");
      return acc + (values.length > 0 ? values.length : 0);
    }

    if (value === "all") return acc;

    return acc + 1;
  }, 0);

  // Handle filter changes locally
  const handleFilterChange = useCallback((filterField, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterField]: value,
    }));
  }, []);

  // Apply filters to URL when "Áp dụng" is clicked
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Update URL with local filter values
    filters.forEach((fil) => {
      const filterField = fil.filterField;
      const value = localFilters[filterField];

      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(filterField);
      } else if (Array.isArray(value)) {
        params.set(filterField, value.join(","));
      } else {
        params.set(filterField, value);
      }
    });

    // Reset page to 1 if page param exists
    if (params.has("page")) {
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
    setIsOpenSideFilter(false);
  }, [localFilters, searchParams, filters, router]);

  return (
    <>
      <Button
        icon
        type="button"
        className="hover:border-accent-700 group relative m-1 !inline-flex rounded-full border-1 md:m-0"
        title="Bộ lọc"
        onClick={() => setIsOpenSideFilter(true)}
      >
        <IoFilter className="group-hover:text-accent-700 h-5 w-5 transition-all" />
        {activeFilters > 0 && (
          <span className="bg-accent-500 absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
            {activeFilters}
          </span>
        )}
      </Button>

      <div className="z-100">
        {/* Faded Overlayer */}
        <div
          onClick={() => setIsOpenSideFilter(false)}
          className={`fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity ${isOpenSideFilter ? "visible opacity-100" : "invisible opacity-0"}`}
        />

        {/* Sidebar */}
        <aside
          className={`bg-primary-100 fixed inset-0 flex h-full w-full transform flex-col shadow-lg transition-all sm:w-md sm:rounded-r-lg ${isOpenSideFilter ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="border-primary-400 bg-primary-0 flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-xl font-semibold">
              Bộ lọc {activeFilters ? `(${activeFilters})` : ""}
            </h2>
            <Button
              icon
              onClick={() => setIsOpenSideFilter(false)}
              className="rounded-full"
            >
              <IoClose className="hover:text-accent-700 h-6 w-6" />
            </Button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-4">
            <NestedFilter
              filters={filters}
              className="grid gap-4"
              label=""
              onFilterChange={handleFilterChange}
              localFilterState={localFilters}
            />
          </div>

          {/* Apply button */}
          <div className="border-primary-400 border-t p-4">
            <Button onClick={applyFilters} className="w-full">
              Áp dụng
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SideFilter;
