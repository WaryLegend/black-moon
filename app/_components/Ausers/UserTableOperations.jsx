import TabFilter from "@/app/_components/Filters/TabFilter";
import SortBy from "@/app/_components/SortBy";

function UserTableOperations() {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-6 lg:gap-8">
      <TabFilter
        filterField="role"
        options={[
          { value: "all", label: "All" },
          { value: "customer", label: "Customer" },
          { value: "staff", label: "Staff" },
          { value: "admin", label: "Admin" },
        ]}
      />

      <TabFilter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "disabled", label: "Disabled" },
        ]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Date (recent first)" },
          { value: "createdAt-asc", label: "Date (earlier first)" },
          { value: "fullName-asc", label: "Full name (A-Z)" },
          { value: "fullName-desc", label: "Full name (Z-A)" },
          { value: "username-asc", label: "Username (A-Z)" },
          { value: "username-desc", label: "Username (Z-A)" },
        ]}
      />
    </div>
  );
}

export default UserTableOperations;
