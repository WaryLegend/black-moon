"use client";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { GROUPS } from "@/app/_utils/constants";
import { capitalizeFirst } from "@/app/_utils/helpers";
import { notFound } from "next/navigation";
import { useParamsContext } from "@/app/_context/NavParamsContext";

function BreadCrumbNav() {
  const { group, categoryId, productId } = useParamsContext();

  // Validate group
  if (!Object.keys(GROUPS).includes(group)) {
    notFound();
  }

  const { label: groupLabel, href: groupHref } = GROUPS[group];

  return (
    <h1 className="inline-flex text-2xl font-semibold lg:text-3xl">
      <Link
        href={groupHref}
        className="hover:text-accent-700 text-accent-600 flex hover:underline"
      >
        <IoIosArrowBack />
        {capitalizeFirst(groupLabel)}
      </Link>

      {categoryId && (
        <>
          <span className="mx-2 font-light">|</span>
          {productId ? (
            <Link
              href={`/${group}/${categoryId}`}
              className="hover:text-accent-700 text-accent-600 hover:underline"
            >
              {/* Replace with actual category name if available */}
              {capitalizeFirst(categoryId)}
            </Link>
          ) : (
            <span>{capitalizeFirst(categoryId)}</span>
          )}
        </>
      )}

      {productId && (
        <>
          <span className="mx-2 font-light">|</span>
          {/* Replace with actual product name if available */}
          <span>{capitalizeFirst(productId)}</span>
        </>
      )}
    </h1>
  );
}

export default BreadCrumbNav;
