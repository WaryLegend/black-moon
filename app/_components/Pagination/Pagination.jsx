"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { PAGE_SIZE } from "@/app/_utils/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

function Pagination({ count }) {
  // 1. get the searchParams
  const searchParams = useSearchParams();
  const router = useRouter();
  // 2. get pathname
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  if (count <= PAGE_SIZE) return null;

  return (
    <div className="flex w-full items-center justify-between">
      {/* indicator */}
      <p className="ml-2 text-sm">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage !== pageCount ? currentPage * PAGE_SIZE : count}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      {/* navigation icon-button */}
      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gray-50 text-gray-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          <HiChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            currentPage === pageCount
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-gray-50 text-gray-700 hover:bg-blue-600 hover:text-white"
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
