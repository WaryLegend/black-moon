export default function CartListSkeleton() {
  return (
    <ul className="divide-primary-300 flex flex-col divide-y">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="relative flex animate-pulse items-center gap-4 py-4"
        >
          <div className="border-primary-400 bg-primary-200 h-25 w-25 rounded-xl" />
          <div className="flex-1 space-y-3">
            <div className="bg-primary-200 h-4 w-3/4 rounded" />
            <div className="bg-primary-200 h-3 w-1/2 rounded" />
            <div className="bg-primary-200 h-8 w-24 rounded" />
          </div>
          <div className="bg-primary-200 absolute top-5 right-1 h-6 w-6 rounded" />
        </li>
      ))}
    </ul>
  );
}
