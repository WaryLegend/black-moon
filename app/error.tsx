"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TbMoonOff } from "react-icons/tb";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("LOGGING ERROR:", error);
  }, [error]);

  // Map technical errors to friendly messages
  const getFriendlyMessage = (err: string) => {
    if (err.includes("fetch"))
      return "We're having trouble connecting to our servers. Please check your internet or try again in a moment.";
    if (err.includes("404"))
      return "We couldn't find the data you were looking for.";
    if (err.includes("Unauthorized") || err.includes("401"))
      return "It looks like you don't have permission to see this.";
    return "An unexpected hiccup occurred on our end. We're working on fixing it!";
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="from-primary-0 to-primary-200 flex flex-col items-center justify-center bg-gradient-to-br via-transparent p-10 text-center max-sm:h-screen">
        {/* Visual Icon */}
        <div className="text-accent-600 mb-6 flex items-center justify-center">
          <TbMoonOff size={50} />
        </div>

        <h2 className="text-primary-900 mb-2 text-xl font-bold tracking-tight sm:text-3xl">
          Oops! Something went wrong
        </h2>

        <p className="text-primary-600 mb-8 max-w-md text-sm sm:text-base">
          {getFriendlyMessage(error.message)}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="bg-accent-600 hover:bg-accent-500 hover:text-primary-50 focus-visible:outline-accent-600 text-primary-100 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-offset-2 active:scale-95 sm:px-6 sm:py-3"
          >
            Try again
          </button>

          <Link
            href="/"
            className="bg-primary-100 border-primary-300 text-primary-700 hover:text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition-all active:scale-95 sm:px-6 sm:py-3"
          >
            Back to Home
          </Link>
        </div>

        {/* Dev-only hint: Remove this section before final production deployment */}
        <p className="text-primary-400 mt-10 font-mono text-xs tracking-widest uppercase opacity-50">
          Error Digest: {error.digest || "N/A"}
        </p>
      </div>
    </div>
  );
}
