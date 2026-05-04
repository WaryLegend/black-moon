import StarRates from "@/components/ui/StarRates";

function ProductAvgRates({
  rates,
  totalReviews = 0,
}: {
  rates: number;
  totalReviews?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <StarRates rates={rates} starLength={1} />
      {totalReviews > 0 && (
        <span className="text-primary-600 text-sm">({totalReviews})</span>
      )}
    </div>
  );
}

export default ProductAvgRates;
