"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";
import WomenPanel from "./WomenPanel";
import MenPanel from "./MenPanel";
import KidsPanel from "./KidsPanel";

function HomePanel() {
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
            className="bg-primary-100/95 absolute top-0 right-0 left-0 z-10 flex h-[calc(100%-150px)] justify-center rounded-b-sm py-10 pt-20 shadow-lg"
          >
            {/* fade animetion */}
            <div className="w-full overflow-y-auto px-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLink}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeLink === "/" && <WomenPanel />}
                  {activeLink === "/men" && <MenPanel />}
                  {activeLink === "/kids" && <KidsPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default HomePanel;
