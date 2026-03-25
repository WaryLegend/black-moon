import UserTableAndBtns from "@/components/admin/users/UserTableAndBtns";
import UserTableOperations from "@/components/admin/users/UserTableOperations";
import { AppPageProps } from "@/types/page-props";
import { UsersPageSearchParams } from "@/types/users";

export const metadata = {
  title: "Users",
};

export default async function UsersPage({
  searchParams,
}: AppPageProps<{}, UsersPageSearchParams>) {
  const query = await searchParams;
  return (
    <>
      <header className="flex flex-col items-center justify-between gap-3 lg:flex-row">
        <h1 className="text-3xl font-semibold">All Users</h1>
        <UserTableOperations />
      </header>
      <UserTableAndBtns searchParams={query} />
    </>
  );
}
