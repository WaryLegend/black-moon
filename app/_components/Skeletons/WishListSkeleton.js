"use client";

export default function WishListSkeleton() {
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {Array.from({ length: 2 }).map((_, i) => (
        <li
          className="relative flex animate-pulse flex-col gap-4 px-2 py-6 sm:flex-row md:gap-6"
          key={i}
        >
          {/* Image placeholder */}
          <div className="relative aspect-square w-25 shrink-0 self-center md:h-auto md:self-auto lg:w-50">
            <div className="h-full w-full rounded-md bg-gray-200" />
          </div>

          {/* Info placeholder */}
          <div className="flex flex-1 flex-col justify-between gap-2">
            <div className="space-y-2">
              <div className="h-5 w-3/4 rounded bg-gray-300" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-4 w-1/4 rounded bg-gray-200" />
            </div>
          </div>

          {/* Heart icon placeholder */}
          <div className="absolute top-5 right-1 h-6 w-6 rounded bg-gray-300" />
        </li>
      ))}
    </ul>
  );
}
