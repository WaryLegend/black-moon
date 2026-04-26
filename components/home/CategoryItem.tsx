import Image from "next/image";
import Link from "next/link";
import type { HomeCategory } from "@/types/homepage";

type CategoryItemProps = {
  category: HomeCategory;
};

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <li>
      <Link
        href={`/${category.groupSlug}/${category.slug}`}
        className="hover:bg-primary-200 flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-all hover:shadow"
      >
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            width={40}
            height={40}
            className="aspect-square h-10 w-10 rounded-lg object-cover"
            alt={`${category.name}'s image`}
          />
        ) : (
          <div className="bg-primary-300 aspect-square h-10 w-10 rounded-lg" />
        )}
        <span className="text-accent-800 flex-1 text-sm">{category.name}</span>
      </Link>
    </li>
  );
}

export default CategoryItem;
