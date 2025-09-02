"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function NavPanel() {
  const { isOpen, activeLink, closeMenu } = useMenuStore();

  console.log(activeLink);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* The panel itself */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 left-0 z-20 mx-auto max-w-7xl rounded-b-2xl bg-white shadow-lg"
          >
            <div className="p-6">
              <p className="font-semibold">Panel for {activeLink}</p>
              {/* You can render different content per activeLink here */}
              {activeLink === "/" && <p>Women’s categories...</p>}
              {activeLink === "/men" && <p>Men’s categories...</p>}
              {activeLink === "/kids" && <p>Kids’ categories...</p>}
            </div>
          </motion.div>

          {/* Click-outside overlay (transparent, covers below panel) */}
          <div
            className="absolute inset-x-0 top-[calc(100%+200px)] bottom-0 bg-transparent"
            onClick={closeMenu}
          />
        </>
      )}
    </AnimatePresence>
  );
}

export default NavPanel;
