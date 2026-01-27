import { STAR_LENGTH } from "@/utils/constants";

export default function ReviewsSectionSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-1 md:gap-4">
      {/* Header: Image + Product Name + Avg Rating */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="bg-primary-200 relative h-24 w-24 rounded-lg lg:h-35 lg:w-35" />

        {/* Product Name & Avg Rating */}
        <div className="flex flex-col gap-3">
          <div className="bg-primary-300 h-8 w-64 rounded-lg" />
          <div className="bg-primary-200 h-6 w-40 rounded" />
        </div>
      </div>

      {/* Section Title + Buttons */}
      <section className="grid">
        <div className="mb-4 flex items-center justify-between">
          <div className="bg-primary-300 h-7 w-48 rounded" />

          <div className="ml-auto flex items-center gap-6">
            {/* Back Button */}
            <div className="flex items-center gap-2">
              <div className="bg-primary-300 h-5 w-5 rounded" />
              <div className="bg-primary-200 h-5 w-24 rounded" />
            </div>

            {/* Write Review Button */}
            <div className="flex items-center gap-2">
              <div className="bg-primary-300 h-5 w-5 rounded" />
              <div className="bg-primary-200 h-5 w-32 rounded" />
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="divide-primary-300 border-primary-400 flex flex-col divide-y border-t">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 py-4">
              {/* User name + date */}
              <div className="flex items-center justify-between">
                <div className="bg-primary-300 h-5 w-32 rounded" />
                <div className="bg-primary-200 h-4 w-24 rounded" />
              </div>

              {/* Star rating placeholder */}
              <div className="flex gap-1">
                {Array.from({ length: STAR_LENGTH }).map((_, starIdx) => (
                  <div
                    key={starIdx}
                    className="bg-primary-300 h-5 w-5 rounded"
                  />
                ))}
              </div>

              {/* Comment lines */}
              <div className="space-y-2">
                <div className="bg-primary-200 h-4 w-11/12 rounded" />
                <div className="bg-primary-200 h-4 w-4/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
