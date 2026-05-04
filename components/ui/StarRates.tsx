import Star from "@/components/ui/Star";
import { MAX_RATE, STAR_LENGTH } from "@/utils/constants";

export default function StarRates({ starLength = STAR_LENGTH, rates = 0 }) {
  // Tinh toán số điểm mỗi sao đại diện
  const pointsPerStar = MAX_RATE / starLength;

  const stars = Array.from({ length: starLength }).map((_, index) => {
    // Tinh toán phần trăm fill cho mỗi ngôi sao
    const starStartValue = index * pointsPerStar;

    const diff = (rates - starStartValue) / pointsPerStar;

    const fill = diff >= 1 ? 100 : diff <= 0 ? 0 : diff * 100;

    return (
      <Star
        key={index}
        fillPercent={fill}
        className="text-accent-600"
        size={16}
      />
    );
  });

  return (
    <div className="flex gap-1">
      <div className="flex items-center">{stars}</div>
      <span className="text-primary-600 text-sm leading-none font-medium sm:text-base">
        {Number(rates.toFixed(1))}
      </span>
    </div>
  );
}
