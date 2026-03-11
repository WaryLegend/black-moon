import DashboardOperations from "@/components/admin/dashboard/DashboardOperations";
import RecentOrderTable from "@/components/admin/dashboard/RecentOrderTable";
import TopSalesChart from "@/components/admin/dashboard/TopSalesChart";
import Stats from "@/components/admin/dashboard/Stats";
import SalesChart from "@/components/admin/dashboard/SalesChart";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <>
      {/* Header */}
      <header className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <DashboardOperations />
      </header>
      {/* All Stat Cards */}
      <Stats />
      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
        <TopSalesChart />
        <SalesChart />
      </div>
      <RecentOrderTable />
    </>
  );
}
