"use client";

import { useEffect, useRef, useState, useId, useTransition } from "react";
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
  const id = useId();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState(searchParams.get(searchField) ?? "");

  // Lưu giá trị tìm kiếm cuối cùng từ URL (không phải từ input).
  // Dùng ref thay vì state để tránh trigger re-render không cần thiết.
  const prevSearchRef = useRef(searchParams.get(searchField) ?? "");

  // Đồng bộ input khi URL thay đổi từ bên ngoài (ví dụ: nhấn nút Back/Forward).
  // So sánh với ref thay vì value để tránh vòng lặp vô tận:
  //   value thay đổi → effect chạy → setValue reset value → inf loop...
  useEffect(() => {
    const currentSearch = searchParams.get(searchField) ?? "";

    if (currentSearch !== prevSearchRef.current) {
      prevSearchRef.current = currentSearch;
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

    // Reset về trang 1 khi thay đổi từ khóa tìm kiếm
    if (params.get("page")) params.set("page", "1");

    // Cập nhật ref trước khi navigate để effect không ghi đè lại giá trị vừa set
    prevSearchRef.current = normalized;

    // startTransition giúp UI không bị block trong khi URL đang được cập nhật
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
      {/* Icon kính lúp — đổi màu khi đang pending*/}
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

      {/* Nút xóa — chỉ hiển thị khi có nội dung trong ô tìm kiếm */}
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
