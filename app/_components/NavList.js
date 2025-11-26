import { grouplinks } from "@/app/_utils/constants";
import NavItem from "@/app/_components/NavItem";
import Link from "next/link";

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
