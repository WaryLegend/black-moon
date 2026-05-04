"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type TabOption = {
  value: string;
  label: string;
};

type TabFilterProps = {
  label?: string | ReactNode;
  filterField: string;
  options: TabOption[];
};

function TabFilter({ label, filterField, options }: TabFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy giá trị hiện tại từ URL
  const currentFilter = searchParams.get(filterField);

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (currentFilter === value) {
      // Nếu nhấn vào cái đang chọn -> Tắt (Xóa khỏi URL)
      params.delete(filterField);
    } else {
      // Nếu nhấn vào cái khác -> Bật (Cập nhật URL)
      params.set(filterField, value);
    }

    // Reset về trang 1 nếu có phân trang
    if (params.get("page")) params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center justify-center gap-1">
      {label &&
        (typeof label === "string" ? (
          // normal case of label
          <label htmlFor={filterField} className="font-medium">
            {label}
          </label>
        ) : (
          // react node case
          <>{label}</>
        ))}
      <div className="border-primary-200 bg-primary-0 flex gap-0.5 rounded-lg border p-1.5 shadow-sm">
        {options.map((option) => {
          const isActive = option.value === currentFilter;

          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-accent-600 text-accent-50 hover:bg-accent-700"
                  : "bg-primary-100 hover:bg-accent-500 hover:text-primary-0"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TabFilter;
