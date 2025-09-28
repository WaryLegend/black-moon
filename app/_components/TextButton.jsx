"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function TextButton({ linkTo, children, className = "", props }) {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${linkTo}`}
      className={`text-blue-700 hover:text-blue-800 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default TextButton;
