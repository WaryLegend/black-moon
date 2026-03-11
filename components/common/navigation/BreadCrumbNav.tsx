import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { GROUPS } from "@/utils/constants";
import { capitalizeFirst } from "@/utils/capitalize";
import { notFound } from "next/navigation";

type Category =
  | string
  | {
      id: string;
      name?: string;
    };
type BreadCrumbPaths = {
  group: string;
  category?: Category;
  product?: string;
};
type GroupKey = keyof typeof GROUPS;

function BreadCrumbNav({ paths }: { paths: BreadCrumbPaths }) {
  const { group, category, product } = paths;

  // Validate group
  if (!Object.keys(GROUPS).includes(group)) {
    notFound();
  }

  const groupKey = group as GroupKey;
  const { label: groupLabel, href: groupHref } = GROUPS[groupKey];

  const categoryName =
    typeof category === "string"
      ? category
      : (category?.name ?? category?.id ?? "");

  return (
    <h1 className="inline-flex text-xl font-semibold md:text-2xl lg:text-3xl">
      <Link
        href={groupHref}
        className="hover:text-accent-700 text-accent-600 flex hover:underline"
      >
        <IoIosArrowBack />
        {capitalizeFirst(groupLabel)}
      </Link>

      {category && (
        <>
          <span className="mx-2 font-light">|</span>
          {product ? (
            <Link
              href={`/${groupKey}/${typeof category === "string" ? category : category.id}`}
              className="hover:text-accent-700 text-accent-600 hover:underline"
            >
              {/* Replace with actual category name if available */}
              {capitalizeFirst(categoryName)}
            </Link>
          ) : (
            <span>{capitalizeFirst(categoryName)}</span>
          )}
        </>
      )}

      {product && (
        <>
          <span className="mx-2 font-light">|</span>
          {/* Replace with actual product name if available */}
          <span>{capitalizeFirst(product)}</span>
        </>
      )}
    </h1>
  );
}

export default BreadCrumbNav;
