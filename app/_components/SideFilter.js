import { IoClose, IoFilter } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import NestedFilter from "@/app/_components/Filters/NestedFilter";
import Button from "@/app/_components/Button";

function SideFilter({ filters }) {
  const [isOpenSideFilter, setIsOpenSideFilter] = useState(false);
  const searchParams = useSearchParams();

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
        {/* Dark background */}
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
            <NestedFilter filters={filters} className="grid gap-4" label="" />
          </div>

          {/* Apply button */}
          <div className="border-primary-400 border-t p-4">
            <Button
              onClick={() => setIsOpenSideFilter(false)}
              className="w-full"
            >
              Áp dụng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideFilter;
