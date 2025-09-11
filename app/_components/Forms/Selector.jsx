export default function Selector({
  data = [],
  type = "text",
  customDefaultOption = "Choose a value",
  className = "",
  ...props
}) {
  return (
    <select
      className={`border-primary-300 bg-primary-50 rounded-md border px-3 py-2 font-sans shadow-sm ${className}`}
      {...props}
    >
      <option value={type === "number" ? 0 : ""} className="text-primary-400">
        {customDefaultOption}
      </option>
      {type === "number"
        ? data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.value}
            </option>
          ))
        : data.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
    </select>
  );
}
