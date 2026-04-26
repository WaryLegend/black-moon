import { getPublicTargetGroups } from "@/services/homepage.api";
import GroupPanel from "./GroupPanel";

export default async function GroupPanelLoader({ slug }: { slug: string }) {
  const groups = await getPublicTargetGroups();
  const activeGroup = groups.find((g) => g.slug === slug);

  if (!activeGroup) return null;
  return <GroupPanel group={activeGroup} />;
}
