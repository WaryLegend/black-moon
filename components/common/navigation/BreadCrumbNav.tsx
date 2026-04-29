import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { capitalizeFirst } from "@/utils/capitalize";
import type { BreadCrumbPaths } from "@/types/breadcrumb";

function BreadCrumbNav({ paths }: { paths?: BreadCrumbPaths }) {
  if (!paths?.group || !paths.category) return null;

  const { group, category, product } = paths;
  const groupHref = `/${group.slug}`;
  const categoryHref = `${groupHref}/${category.slug}`;

  return (
    <h1 className="inline-flex text-xl font-semibold md:text-2xl">
      <Link
        href={groupHref}
        className="hover:text-accent-700 text-accent-600 flex hover:underline"
      >
        <IoIosArrowBack />
        {capitalizeFirst(group.name)}
      </Link>

      <>
        <span className="mx-2 font-light">|</span>
        {product ? (
          <Link
            href={categoryHref}
            className="hover:text-accent-700 text-accent-600 hover:underline"
          >
            {capitalizeFirst(category.name)}
          </Link>
        ) : (
          <span>{capitalizeFirst(category.name)}</span>
        )}
      </>

      {product && (
        <>
          <span className="mx-2 font-light">|</span>
          <span>{capitalizeFirst(product.name)}</span>
        </>
      )}
    </h1>
  );
}

export default BreadCrumbNav;
