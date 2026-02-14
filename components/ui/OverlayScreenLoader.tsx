"use client";

import Spinner from "./Spinner";
import { useIsMutating } from "@tanstack/react-query";

export default function OverlayScreenLoader() {
  const isLoggingOut = useIsMutating({ mutationKey: ["logout"] }) > 0;

  // add more condition
  if (isLoggingOut)
    return (
      <div className="bg-primary-400/50 fixed inset-0 z-100 flex min-h-screen items-center justify-center">
        <Spinner type="bar" color="var(--color-accent-900)" size={60} />
      </div>
    );
  return null;
}
