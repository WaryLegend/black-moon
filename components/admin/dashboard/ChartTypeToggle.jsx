function ChartTypeToggle({ chartType, onClick }) {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => onClick("category")}
        className={`rounded-lg px-3 py-1 text-sm font-medium transition-all ${
          chartType === "category"
            ? "bg-accent-600 text-primary-50"
            : "bg-accent-50 text-primary-800 opacity-50"
        }`}
      >
        Category
      </button>
      <button
        onClick={() => onClick("product")}
        className={`rounded-lg px-3 py-1 text-sm font-medium transition-all ${
          chartType === "product"
            ? "bg-accent-600 text-primary-0"
            : "bg-accent-50 text-primary-800 opacity-50"
        }`}
      >
        Product
      </button>
    </div>
  );
}

export default ChartTypeToggle;
