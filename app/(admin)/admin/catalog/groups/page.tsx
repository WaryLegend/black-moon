import GroupsTableAndBtns from "@/components/admin/groups/GroupTableAndBtns";
import GroupTableOperations from "@/components/admin/groups/GroupTableOperations";
import { GroupsPageSearchParams } from "@/types/groups";
import { AppPageProps } from "@/types/page-props";

export const metadata = {
  title: "Groups",
};

export default async function GroupsPage({
  searchParams,
}: AppPageProps<{}, GroupsPageSearchParams>) {
  const query = await searchParams;
  return (
    <>
      <header className="flex flex-col items-center justify-between lg:flex-row">
        <h1 className="text-3xl font-semibold">All Groups</h1>
        <GroupTableOperations />
      </header>
      <GroupsTableAndBtns searchParams={query} />
    </>
  );
}
