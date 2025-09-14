"use client";

import { IoClose, IoFilter } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import NestedFilter from "@/app/_components/Filters/NestedFilter";
import Button from "@/app/_components/Button";

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

    router.push(`?${params.toString()}`);
    setIsOpenSideFilter(false);
  }, [localFilters, searchParams, filters, router]);

  return (
    <>
      <button
        className="relative inline-flex items-center justify-center p-1"
        title="Bộ lọc"
        onClick={() => setIsOpenSideFilter(true)}
      >
        <IoFilter className="hover:text-accent-700 h-5 w-5" />
        {activeFilters > 0 && (
          <span className="bg-accent-500 absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
            {activeFilters}
          </span>
        )}
      </button>

      <div className="z-100">
        {/* Faded Overlayer */}
        <div
          onClick={() => setIsOpenSideFilter(false)}
          className={`bg-primary-800/50 fixed inset-0 transition-opacity ${isOpenSideFilter ? "visible opacity-100" : "invisible opacity-0"}`}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-10 flex h-full w-full transform flex-col bg-white shadow-lg transition-transform sm:w-md ${isOpenSideFilter ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="border-primary-400 flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-xl font-semibold">
              Bộ lọc {activeFilters ? `(${activeFilters})` : ""}
            </h2>
            <button
              onClick={() => setIsOpenSideFilter(false)}
              className="flex items-center justify-center p-1"
            >
              <IoClose className="hover:text-accent-700 h-5 w-5" />
            </button>
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
        </div>
      </div>
    </>
  );
}

export default SideFilter;
