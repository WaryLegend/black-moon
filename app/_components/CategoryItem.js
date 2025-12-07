import Image from "next/image";
import Link from "next/link";
import test_img from "@/public/t-shirt.jpg";

function CategoryItem({ category }) {
  return (
    <li>
      <Link
        href={`/${category.group}/${category.id}`}
        className="hover:bg-primary-200 flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all hover:shadow"
      >
        <Image
          src={test_img}
          className="aspect-square rounded-lg object-cover"
          alt={`${category.name}'s image`}
          width={40}
          height={40}
        />
        <span className="text-accent-800 flex-1 text-sm">{category.name}</span>
      </Link>
    </li>
  );
}

export default CategoryItem;
