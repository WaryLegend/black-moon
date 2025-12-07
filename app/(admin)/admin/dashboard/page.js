import DashboardOperations from "@/app/_components/Adashboard/DashboardOperations";
import RecentOrderTable from "@/app/_components/Adashboard/RecentOrderTable";
import TopSalesChart from "@/app/_components/Adashboard/TopSalesChart";
import Stats from "@/app/_components/Adashboard/Stats";
import SalesChart from "@/app/_components/Adashboard/SalesChart";

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
