"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ViewProductLink({ productId, prop }) {
  const pathname = usePathname();

  return (
    <Link
      href={`${pathname}/${productId}`}
      className="bg-primary-50 hover:bg-primary-200 absolute right-2.5 bottom-2.5 rounded-full px-2 py-1 shadow-2xl transition-all"
      {...prop}
    >
      Xem sản phẩm
    </Link>
  );
}

export default ViewProductLink;
