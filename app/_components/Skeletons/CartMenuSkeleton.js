export default function CartMenuSkeleton() {
  return (
    <div className="bg-primary-0 animate-pulse rounded-md">
      <div className="sticky top-[var(--header-height)] space-y-3 p-3">
        {/* Header */}
        <div className="h-6 w-[60%] rounded bg-gray-300" />
        {/* Extras */}
        <div className="h-4 rounded bg-gray-200" />
        <div className="h-4 w-[85%] rounded bg-gray-200" />

        {/* Rows */}
        <div className="flex justify-between gap-10">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-[70%] rounded bg-gray-200" />
        </div>
        <div className="flex justify-between gap-10">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-[50%] rounded bg-gray-200" />
        </div>

        {/* Buttons */}
        <div className="h-10 rounded bg-gray-300" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
    </div>
  );
}
