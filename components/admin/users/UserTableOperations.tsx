import TabFilter from "@/components/filters/TabFilter";
import SortBy from "@/components/filters/SortBy";

function UserTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TabFilter
        filterField="role"
        options={[
          { value: "all", label: "All" },
          { value: "user", label: "User" },
          { value: "staff", label: "Staff" },
          { value: "manager", label: "Manager" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <TabFilter
        filterField="activated"
        options={[
          { value: "all", label: "All" },
          { value: "true", label: "Activated" },
          { value: "false", label: "Disabled" },
        ]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Date (recent first)" },
          { value: "createdAt-asc", label: "Date (earlier first)" },
          { value: "firstName-asc", label: "First name (A-Z)" },
          { value: "firstName-desc", label: "First name (Z-A)" },
          { value: "lastName-asc", label: "Last name (A-Z)" },
          { value: "lastName-desc", label: "Last name (Z-A)" },
        ]}
      />
    </div>
  );
}

export default UserTableOperations;
