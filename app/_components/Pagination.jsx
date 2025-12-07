"use client";

import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/app/_utils/constants";
import Button from "@/app/_components/Button";

function Pagination({ count }) {
  if (count <= PAGE_SIZE) return null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const setPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const goToFirst = () => setPage(1);
  const goToLast = () => setPage(pageCount);
  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < pageCount) setPage(currentPage + 1);
  };

  // Generate page numbers to show (1-2 pages before and after current)
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(pageCount, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Showing info */}
      <p className="text-sm md:text-base">
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
      <div className="flex items-center gap-2">
        {/* First Button - hidden if on first page */}
        {currentPage > 1 && (
          <Button
            icon
            onClick={goToFirst}
            className="border-accent-200 hover:!bg-accent-600 bg-accent-50 hover:text-primary-0 gap-1 rounded-l-lg border text-sm font-medium lg:p-2"
            type="button"
            title="Go to first page"
          >
            <HiChevronDoubleLeft className="h-5 w-5" />
            <span>First</span>
          </Button>
        )}

        {/* Prev Button - hidden if on first page */}
        {currentPage > 1 && (
          <Button
            icon
            onClick={prevPage}
            className="border-accent-200 hover:!bg-accent-600 bg-accent-50 hover:text-primary-0 rounded-l-lg border text-sm font-medium lg:p-2"
            type="button"
            title="Previous page"
          >
            <HiChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Page Numbers */}
        <div className="flex">
          {pageNumbers.map((page) => (
            <Button
              icon
              key={page}
              onClick={() => setPage(page)}
              className={`border px-4 text-sm font-medium lg:p-2 lg:px-3 ${
                page === currentPage
                  ? "border-accent-500 bg-accent-500 text-primary-0"
                  : "border-accent-200 bg-accent-50 hover:!bg-accent-600 hover:text-primary-0 hover:border-accent-600"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Next Button - hidden if on last page */}
        {currentPage < pageCount && (
          <Button
            icon
            onClick={nextPage}
            className="border-accent-200 hover:!bg-accent-600 bg-accent-50 hover:text-primary-0 rounded-r-lg border text-sm font-medium lg:p-2"
            type="button"
            title="Next page"
          >
            <HiChevronRight className="h-5 w-5" />
          </Button>
        )}

        {/* Last Button - hidden if on last page */}
        {currentPage < pageCount && (
          <Button
            icon
            onClick={goToLast}
            className="border-accent-200 hover:!bg-accent-600 bg-accent-50 hover:text-primary-0 gap-1 rounded-r-lg border text-sm font-medium lg:p-2"
            type="button"
            title="Go to last page"
          >
            <span>Last</span>
            <HiChevronDoubleRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default Pagination;
