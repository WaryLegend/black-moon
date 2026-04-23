"use client";

import { useEffect, useState, useId, useTransition } from "react";
import type { KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { cn } from "@/utils/cn";

type SearchFilterProps = {
  searchField?: string;
  placeholder?: string;
  className?: string;
};

function SearchFilter({
  searchField = "search",
  placeholder = "Tìm kiếm...",
  className = "",
}: SearchFilterProps) {
  const id = useId(); // Sửa lỗi thiếu ID cho input
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition(); // Giúp UI mượt hơn khi URL thay đổi

  const [value, setValue] = useState(searchParams.get(searchField) ?? "");

  // Đồng bộ hóa value khi URL thay đổi từ bên ngoài (ví dụ: nhấn nút Back)
  useEffect(() => {
    const currentSearch = searchParams.get(searchField) ?? "";
    if (currentSearch !== value) {
      setValue(currentSearch);
    }
  }, [searchParams, searchField]);

  function applySearch(nextValue: string) {
    const params = new URLSearchParams(searchParams);
    const normalized = nextValue.trim();

    if (normalized) {
      params.set(searchField, normalized);
    } else {
      params.delete(searchField);
    }

    if (params.get("page")) params.set("page", "1");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    applySearch(value);
  }

  function handleClear() {
    setValue("");
    applySearch("");
  }

  return (
    <div className="group relative flex items-center">
      <div className="pointer-events-none absolute left-3 flex items-center">
        <HiMagnifyingGlass
          className={`h-5 w-5 transition-colors ${isPending ? "text-accent-300" : "text-accent-500"}`}
        />
      </div>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "border-accent-300 bg-primary-0 text-primary-700 focus:border-accent-500 focus:ring-accent-500 hover:border-accent-700 rounded-lg border py-2 pr-10 pl-10 text-sm shadow-sm transition-all focus:outline-1",
          className,
        )}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-accent-400 hover:text-accent-700 absolute right-3 flex items-center"
          aria-label="Xóa tìm kiếm"
        >
          <HiXMark className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

export default SearchFilter;
