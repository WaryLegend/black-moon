import { formatCurrency } from "@/app/_utils/helpers";

function CustomLegend(props) {
  const { payload, data } = props;
  if (!payload) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="bg-primary-100 flex items-center gap-2 rounded-lg px-2 py-1 text-xs md:text-sm"
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-medium" style={{ color: entry.color }}>
            {entry.name}
          </span>
          <span className="text-primary-600 font-semibold">
            {formatCurrency(data[index]?.value || 0)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomLegend;
