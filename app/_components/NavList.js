import { grouplinks } from "@/app/_utils/constants";
import NavItem from "@/app/_components/NavItem";

function NavList() {
  return (
    <>
      {grouplinks.map((link, index) => (
        <NavItem key={index} link={link} />
      ))}
    </>
  );
}

export default NavList;
