"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/app/_utils/constants";

function Pagination({ count }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (count <= PAGE_SIZE) return null;

  const setPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < pageCount) setPage(currentPage + 1);
  };

  return (
    <div className="flex w-full items-center justify-between">
      {/* Showing info */}
      <p className="ml-2 text-sm md:text-base">
        Showing{" "}
        <span className="text-accent-600 font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="text-accent-600 font-semibold">
          {currentPage !== pageCount ? currentPage * PAGE_SIZE : count}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        {/* Prev Button */}
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`border-accent-200 flex items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all ${
            currentPage === 1
              ? "bg-accent-100 text-accent-400 cursor-not-allowed"
              : "hover:bg-accent-600 bg-accent-50 hover:text-primary-0"
          }`}
        >
          <HiChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {/* Next Button */}
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`border-accent-200 flex items-center justify-center gap-1 rounded-md border px-3 py-2 text-sm font-medium transition-all ${
            currentPage === pageCount
              ? "bg-accent-100 text-accent-400 cursor-not-allowed"
              : "hover:bg-accent-600 bg-accent-50 hover:text-primary-0"
          }`}
        >
          <span>Next</span>
          <HiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
