"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";

function Guest() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const returnUrl = query ? `${pathname}?${query}` : pathname;

  return (
    <Link
      href={`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`}
      className="hover:text-accent-700 flex items-center gap-1 p-1 hover:underline"
    >
      <FaRegUserCircle className="h-5 w-5" />

      <span className="hidden text-lg font-semibold sm:text-xl md:block">
        Log in
      </span>
    </Link>
  );
}

export default Guest;
