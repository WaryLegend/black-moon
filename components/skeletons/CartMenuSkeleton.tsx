export default function CartMenuSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-primary-0 sticky top-[var(--header-height)] space-y-3 rounded-lg p-3">
        {/* Header */}
        <div className="bg-primary-300 h-6 w-[60%] rounded" />
        {/* Extras */}
        <div className="bg-primary-200 h-4 rounded" />
        <div className="bg-primary-200 h-4 w-[85%] rounded" />

        {/* Rows */}
        <div className="flex justify-between gap-10">
          <div className="bg-primary-200 h-4 w-full rounded" />
          <div className="bg-primary-200 h-4 w-[70%] rounded" />
        </div>
        <div className="mb-5 flex justify-between gap-10">
          <div className="bg-primary-200 h-4 w-full rounded" />
          <div className="bg-primary-200 h-4 w-[50%] rounded" />
        </div>

        {/* Buttons */}
        <div className="bg-primary-300 h-10 rounded" />
        <div className="bg-primary-200 h-10 rounded" />
      </div>
    </div>
  );
}
