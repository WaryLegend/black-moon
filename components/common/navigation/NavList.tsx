import NavItem from "@/common/navigation/NavItem";
import { getPublicTargetGroups } from "@/services/homepage.api";

async function NavList() {
  const groups = await getPublicTargetGroups();

  if (!groups.length) {
    return null;
  }

  return (
    <ul className="flex items-center justify-evenly md:justify-normal md:gap-8 lg:gap-15">
      {groups.map((group) => (
        <NavItem
          key={group.slug}
          link={{ href: `/${group.slug}`, label: group.name }}
        />
      ))}
    </ul>
  );
}

export default NavList;
