"use client";

import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

export default function OrdersLayout({ children, details }) {
  const detailsSegment = useSelectedLayoutSegment("details");
  const hasDetails = Boolean(detailsSegment);

  return (
    <div className="divide-primary-300 flex flex-col gap-10 max-lg:divide-y lg:flex-row lg:gap-4 lg:divide-x">
      <div className={`w-full flex-2 ${hasDetails ? "lg:pr-2" : ""}`}>
        {children}
      </div>

      {hasDetails && (
        <motion.div
          className="w-full flex-3"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
        >
          {details}
        </motion.div>
      )}
    </div>
  );
}
