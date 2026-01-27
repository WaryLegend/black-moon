import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import CountUp from "react-countup";

function Stat({
  title,
  value,
  rates,
  dateUnit,
  icon,
  color = "",
  suffix = "",
  formattingFn,
  isLoading = false,
}) {
  return (
    <div className="bg-primary-0 relative flex items-center rounded-lg p-4 shadow-md lg:p-6">
      <div className="flex flex-wrap items-center">
        <div className={`${color} mr-4 rounded-full p-2 lg:mr-6`}>{icon}</div>
        <div className="space-y-1">
          <p className="text-primary-600 text-sm font-semibold">{title}</p>
          {isLoading ? (
            <>
              <div className="bg-primary-300 h-5 w-25 animate-pulse rounded lg:w-28" />
              <div className="bg-primary-200 h-3 w-28 animate-pulse rounded lg:w-30" />
            </>
          ) : (
            <>
              <p className="text-xl font-bold lg:text-2xl">
                {value ? (
                  <CountUp
                    end={value}
                    duration={2}
                    separator="."
                    suffix={suffix}
                    formattingFn={formattingFn}
                  />
                ) : (
                  "—"
                )}
              </p>
              {rates != null && rates !== 0 && (
                <p className="flex items-center gap-1 text-sm">
                  {rates > 0 ? (
                    <FaArrowTrendUp className="text-green-600" />
                  ) : (
                    <FaArrowTrendDown className="text-red-600" />
                  )}
                  <span
                    className={rates > 0 ? "text-green-600" : "text-red-600"}
                  >
                    {rates > 0 ? "+" : ""}
                    <CountUp end={rates} duration={2} suffix="%" /> from{" "}
                    {dateUnit}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className={`absolute inset-y-0 right-0 w-1 ${color} top-1/2 h-[75%] w-2 -translate-y-1/2 rounded-l-full`}
      />
    </div>
  );
}

export default Stat;
