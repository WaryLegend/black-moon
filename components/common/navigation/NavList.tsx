"use client";

import { grouplinks } from "@/utils/constants";
import NavItem from "@/common/navigation/NavItem";
import { motion } from "framer-motion";

function NavList() {
  return (
    <motion.ul
      layout
      className="flex items-center justify-evenly md:justify-normal md:gap-8 lg:gap-15"
    >
      {grouplinks.map((link) => (
        <NavItem key={link.href} link={link} />
      ))}
    </motion.ul>
  );
}

export default NavList;
