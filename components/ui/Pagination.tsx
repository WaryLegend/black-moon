"use client";

import { JSX } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/utils/constants";
import Button from "@/components/ui/Button";

type PaginationProps = {
  count: number;
};

type PageItem = number | "...";

export default function Pagination({
  count,
}: PaginationProps): JSX.Element | null {
  if (count <= PAGE_SIZE) return null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < pageCount) setPage(currentPage + 1);
  };

  // Generate visible page numbers
  const getPageNumbers = (): PageItem[] => {
    if (pageCount <= 1) return [1];

    const delta = 2;
    const pages: PageItem[] = [];

    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(pageCount - 1, currentPage + delta);

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < pageCount - 1) {
      pages.push("...");
    }

    if (pageCount > 1) {
      pages.push(pageCount);
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

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        {/* Back */}
        <Button
          icon
          onClick={prevPage}
          disabled={currentPage === 1}
          className="not-disabled:hover:!bg-accent-600 text-accent-600 disabled:hover:bg-accent-50 disabled:text-primary-400 hover:text-primary-0 rounded-lg text-sm font-semibold lg:p-2"
        >
          <HiChevronLeft className="h-5 w-5" />
          <span className="hidden md:inline">Back</span>
        </Button>

        {/* Page numbers */}
        <div className="flex gap-2">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="p-1 align-text-bottom text-sm font-medium lg:p-2"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                icon
                onClick={() => setPage(page)}
                className={`hover:!bg-accent-600 hover:text-primary-0 hover:border-accent-600 h-7 w-6 rounded-lg border text-sm font-medium lg:h-9 lg:w-8 ${
                  page === currentPage
                    ? "bg-accent-500 text-primary-0 border-accent-500"
                    : "text-accent-600 border-accent-200 bg-accent-50"
                }`}
              >
                {page}
              </Button>
            ),
          )}
        </div>

        {/* Next */}
        <Button
          icon
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="not-disabled:hover:!bg-accent-600 text-accent-600 disabled:hover:bg-accent-50 disabled:text-primary-400 hover:text-primary-0 rounded-lg text-sm font-semibold lg:p-2"
        >
          <span className="hidden md:inline">Next</span>
          <HiChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
