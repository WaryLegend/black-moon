"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function TextButton({
  linkTo,
  href,
  children,
  className = "",
  onClick,
  props,
}) {
  const pathname = usePathname();
  if (href || linkTo)
    return (
      <Link
        href={href || `${pathname}/${linkTo}`}
        className={`text-blue-700 hover:text-blue-800 ${className}`}
        {...props}
      >
        {children}
      </Link>
    );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-blue-700 hover:text-blue-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default TextButton;
