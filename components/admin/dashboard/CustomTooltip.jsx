import { formatCurrency } from "@/utils/currency";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-primary-100 border-primary-200 rounded-lg border p-3 shadow-md">
      {label && <p className="text-primary-800 mb-2 font-bold">{label}</p>}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <span
            className="text-sm font-medium"
            style={{ color: entry.payload?.color || entry.color }}
          >
            {entry.name || entry.dataKey}:
          </span>
          <span className="text-primary-600 text-sm font-semibold">
            {typeof entry.value === "number"
              ? formatCurrency(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip;
