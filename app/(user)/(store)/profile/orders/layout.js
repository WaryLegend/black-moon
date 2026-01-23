"use client";

import QueryProvider from "@/app/_components/QueryClientProvider";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function OrdersLayout({ children, details }) {
  const searchParams = useSearchParams();
  const hasDetails = Boolean(searchParams.get("orderId"));

  return (
    <QueryProvider>
      <div className="divide-primary-300 flex flex-col gap-10 max-lg:divide-y lg:flex-row lg:gap-4 lg:divide-x">
        <section
          className={`w-full flex-2 ${hasDetails ? "pb-1 lg:pr-2" : ""}`}
        >
          {children}
        </section>

        {hasDetails && (
          <section className="w-full flex-3 overflow-x-hidden">
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
            >
              {details}
            </motion.div>
          </section>
        )}
      </div>
    </QueryProvider>
  );
}
