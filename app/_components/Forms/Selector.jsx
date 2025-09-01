export default function Selector({ data = [], className = "", ...props }) {
  return (
    <select
      className={`border-primary-300 bg-primary-50 rounded-md border px-3 py-2 font-sans shadow-sm ${className}`}
      {...props}
    >
      <option value="" className="text-primary-500">
        -- Select a product --
      </option>
      {data.map((product) => (
        <option key={product.id} value={product.name}>
          {product.name}
        </option>
      ))}
    </select>
  );
}
