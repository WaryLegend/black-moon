"use client";

import Filter from "@/components/filters/Filter";
import SearchFilter from "@/components/filters/SearchFilter";
import SortBy from "@/components/filters/SortBy";

const TYPE_OPTIONS = [
  { value: "manual_update", label: "Manual Update" },
  { value: "excel_import", label: "Excel Import" },
  { value: "sale", label: "Sale" },
  { value: "return", label: "Return" },
  { value: "order_cancel", label: "Order Cancel" },
];

export default function InventoryHistoryTableOperations() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <SearchFilter
        placeholder="Search by SKU or notes"
        className="min-w-[18rem]"
      />

      <Filter
        filterField="type"
        options={TYPE_OPTIONS}
        selectProps={{
          minWidth: 220,
          isAnimated: true,
          placeholder: "Type of change",
          isClearable: true,
        }}
      />

      <div className="ml-0 sm:ml-auto">
        <SortBy
          options={[
            { value: "timestamp-desc", label: "Timestamp (recent first)" },
            { value: "timestamp-asc", label: "Timestamp (earlier first)" },
            { value: "createdAt-desc", label: "Date (recent first)" },
            { value: "createdAt-asc", label: "Date (earlier first)" },
          ]}
        />
      </div>
    </div>
  );
}
