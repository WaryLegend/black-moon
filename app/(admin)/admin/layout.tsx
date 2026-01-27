import AdHeaderSideNav from "@/components/admin/layout/AdHeaderSideNav";
import QueryProvider from "@/components/QueryClientProvider";

export const metadata = {
  title: {
    template: "Admin | %s | Black & Moon",
    default: "Admin | Black & Moon",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <AdHeaderSideNav />
      <QueryProvider>
        <div className="bg-primary-100 flex-1 overflow-auto px-8 py-8">
          <main className="mx-auto flex w-full max-w-[1750px] flex-col gap-6">
            {children}
          </main>
        </div>
      </QueryProvider>
    </div>
  );
}
