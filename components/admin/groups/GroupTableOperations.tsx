import SortBy from "@/components/filters/SortBy";

export default function GroupTableOperations() {
  return (
    <div className="flex w-full">
      <div className="ml-0 sm:ml-auto">
        <SortBy
          options={[
            { value: "createdAt-desc", label: "Date (recent first)" },
            { value: "createdAt-asc", label: "Date (earlier first)" },
            { value: "name-asc", label: "Name (A-Z)" },
            { value: "name-desc", label: "Name (Z-A)" },
          ]}
        />
      </div>
    </div>
  );
}
