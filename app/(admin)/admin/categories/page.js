import CategoryTableOperations from "@/app/_components/categories/CategoryTableOperations";

export const metadata = {
  title: "Categories",
};

export default function Page() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold">All Categories</h1>
      <CategoryTableOperations />
    </div>
  );
}
