import UserTableAndBtns from "@/components/admin/users/UserTableAndBtns";
import UserTableOperations from "@/components/admin/users/UserTableOperations";

export const metadata = {
  title: "Users",
};

export default async function Page({ searchParams }) {
  const filterParams = await searchParams;
  return (
    <>
      <header className="flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-3xl font-semibold">All Users</h1>
        <UserTableOperations />
      </header>
      <UserTableAndBtns searchParams={filterParams} />
    </>
  );
}
