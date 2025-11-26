export default function ColorAndSizeSkeleton() {
  return (
    <div className="space-y-5">
      {/* Colors Skeleton */}
      <div>
        <p className="mb-2 font-medium">Màu sắc</p>
        <div className="flex animate-pulse flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-primary-300 h-8 w-8 rounded-full" />
          ))}
        </div>
      </div>

      {/* Sizes Skeleton */}
      <div>
        <p className="mb-2 font-medium">Kích cỡ</p>
        <div className="flex animate-pulse flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-primary-200 h-8 w-16 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
