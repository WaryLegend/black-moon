"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/app/_context/HomeMenuStore";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

function HomePanel({ panels }) {
  const { isOpen, activeLink, closeMenu } = useMenuStore();

  return (
    <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-screen">
      {/* Overlay */}
      <motion.div
        key="overlay"
        className="bg-accent-900/30 pointer-events-auto inset-0 h-full"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={closeMenu}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={false}
        animate={{
          y: isOpen ? 0 : -40,
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.98,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
        className="bg-primary-100/95 pointer-events-auto absolute top-0 right-0 left-0 z-10 flex h-[calc(100%-150px)] justify-center rounded-b-sm py-10 pt-20 shadow-lg"
      >
        {/* Fade animation for content */}
        <div className="w-full overflow-y-auto px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLink}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Suspense
                fallback={
                  <div className="mt-10 flex justify-center">
                    <Spinner
                      type="bar"
                      color="var(--color-accent-600)"
                      className="my-0.5"
                    />
                  </div>
                }
              >
                {panels[activeLink]}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePanel;
