export default function CartListSkeleton() {
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="relative flex animate-pulse items-center gap-4 py-4"
        >
          <div className="h-25 w-25 rounded-xl border-2 border-dashed border-gray-400 bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
          <div className="absolute top-5 right-1 h-6 w-6 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}
