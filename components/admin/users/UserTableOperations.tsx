import TabFilter from "@/components/filters/TabFilter";
import SortBy from "@/components/filters/SortBy";

function UserTableOperations() {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <TabFilter
        filterField="role"
        options={[
          { value: "user", label: "User" },
          { value: "staff", label: "Staff" },
          { value: "manager", label: "Manager" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <TabFilter
        label="Activated"
        filterField="activated"
        options={[
          { value: "true", label: "True" },
          { value: "false", label: "False" },
        ]}
      />
      <div className="ml-0 sm:ml-auto">
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
    </div>
  );
}

export default UserTableOperations;
