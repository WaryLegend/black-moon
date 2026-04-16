"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  getUnexpectedErrorMessage,
  isUnexpectedError,
} from "@/lib/http/errorMessages";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (!isUnexpectedError(error)) {
              return;
            }

            toast.error(getUnexpectedErrorMessage(error), {
              id: "global-unexpected-error",
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            if (!isUnexpectedError(error)) {
              return;
            }

            toast.error(getUnexpectedErrorMessage(error), {
              id: "global-unexpected-error",
            });
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
