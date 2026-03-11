export default function OrderSummarySkeleton() {
  return (
    <div className="bg-primary-0 animate-pulse rounded-lg p-3 lg:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="bg-primary-200 h-7 w-48 rounded" />
        <div className="bg-primary-200 h-6 w-20 rounded" />
      </div>

      {/* item list */}
      <ul className="mb-6 space-y-4">
        {[1, 2].map((i) => (
          <li key={i} className="flex gap-3">
            <div className="bg-primary-200 h-20 w-20 rounded-lg" />
            <div className="flex-1 space-y-2 py-1">
              <div className="bg-primary-200 h-4 w-3/4 rounded" />
              <div className="bg-primary-200 h-3 w-1/3 rounded" />
            </div>
            <div className="bg-primary-200 mt-auto h-5 w-20 rounded" />
          </li>
        ))}
      </ul>

      {/* Price breakdown */}
      <div className="space-y-3 border-t pt-4">
        {/* Tạm tính */}
        <div className="flex justify-between">
          <div className="bg-primary-200 h-5 w-20 rounded" />
          <div className="bg-primary-200 h-5 w-28 rounded" />
        </div>
        {/* Phí vận chuyển */}
        <div className="flex justify-between">
          <div className="bg-primary-200 h-5 w-32 rounded" />
          <div className="bg-primary-200 h-5 w-16 rounded" />
        </div>
        {/* Tổng cộng - highlighted */}
        <div className="border-t pt-3">
          <div className="flex items-end justify-between">
            <div className="bg-primary-200 h-7 w-24 rounded" />
            <div className="bg-primary-300 h-9 w-36 rounded" />{" "}
            {/* Larger & slightly darker for emphasis */}
          </div>
        </div>
      </div>
    </div>
  );
}
