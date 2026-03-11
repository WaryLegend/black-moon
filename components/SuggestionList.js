import Image from "next/image";
import test_img from "@/public/t-shirt.jpg";

function SuggestionList({ suggestions = [] }) {
  return (
    <>
      <h2 className="mt-10 mb-4 flex justify-center text-xl font-bold">
        Gợi ý mỗi tuần
      </h2>
      <ul className="border-primary-300 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-5 border-b-1 pb-5 sm:px-10 lg:px-20">
        {suggestions.map((suggest, index) => (
          <li
            key={index}
            className="group border-primary-200 bg-primary-0 flex cursor-pointer flex-col overflow-hidden rounded-lg border shadow-sm transition hover:shadow-md"
          >
            {/* Image wrapper */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={test_img}
                alt={`${suggest}'s image`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Caption */}
            <div className="p-3 text-center">
              <span className="text-accent-800 text-sm font-medium">
                {suggest}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SuggestionList;
