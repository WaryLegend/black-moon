"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMenuStore } from "@/contexts/HomeMenuStore";

type HomePanelProps = {
  children?: React.ReactNode;
};

function HomePanel({ children }: HomePanelProps) {
  const { isOpen, closeMenu } = useMenuStore();

  return (
    <div className="pointer-events-none absolute top-0 right-0 left-0 z-5 h-screen">
      <motion.div
        key="overlay"
        className="pointer-events-auto inset-0 h-full backdrop-blur-sm"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={closeMenu}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

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
        className="bg-primary-100/95 pointer-events-auto absolute top-0 right-0 left-0 z-10 flex h-4/5 justify-center rounded-b-sm py-10 pt-30 shadow-lg md:pt-20"
      >
        <div className="w-full overflow-y-auto px-10">
          <AnimatePresence mode="wait">
            {isOpen && children ? (
              <motion.div
                key="group-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePanel;
