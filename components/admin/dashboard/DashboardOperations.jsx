import FirstChosenFilter from "@/components/filters/FirstChosenFilter";

function DashboardOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-6 lg:gap-8">
      <FirstChosenFilter
        label="Time range"
        filterField="last"
        options={[
          { value: "7", label: "Last 7 days" },
          { value: "30", label: "Last 30 days" },
          { value: "90", label: "Last 3 months" },
          { value: "180", label: "Last 6 months" },
          { value: "365", label: "Last year" },
        ]}
      />
    </div>
  );
}

export default DashboardOperations;
