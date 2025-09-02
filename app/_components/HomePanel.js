"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";

function NavPanel() {
  const { isOpen, activeLink, closeMenu } = useMenuStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute top-0 right-0 left-0 z-10 h-screen">
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="bg-accent-900/30 inset-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ y: -40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            className="bg-primary-100/95 absolute top-0 right-0 left-0 z-10 h-[calc(100%-150px)] rounded-b-sm p-10 pt-20 shadow-lg"
          >
            <div>
              <p className="font-semibold">Panel for {activeLink}</p>
              {activeLink === "/" && <p>Women’s categories...</p>}
              {activeLink === "/men" && <p>Men’s categories...</p>}
              {activeLink === "/kids" && <p>Kids’ categories...</p>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default NavPanel;
