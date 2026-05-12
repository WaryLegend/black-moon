import SystemConfigs from "@/components/admin/system-configs/SystemConfigs";

export const metadata = {
  title: "System configs",
};

export default function SystemConfigsPage() {
  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 sm:items-start">
        <h1 className="text-3xl font-semibold">System Configuration</h1>
      </header>
      <SystemConfigs />
    </>
  );
}
