"use client";

import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { fCurrencyShorten, formatNumber } from "@/app/_utils/helpers";
import { useOrdersByDateRange } from "@/app/_hooks/useOrdersByDateRange";
import Stat from "./Stat";

const iconColors = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  default: "bg-accent-100 text-accent-700",
};

function Stats() {
  const { isLoading, totalRevenue, totalOrdersCount, productsSold, numDays } =
    useOrdersByDateRange();

  const dateUnitLabel = {
    90: "3 months",
    180: "6 months",
    365: "year",
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Stat
        title="Total Revenue"
        value={totalRevenue}
        rates={+20}
        dateUnit={`last ${dateUnitLabel?.[numDays] ?? `${numDays} days`}`}
        icon={<HiOutlineBanknotes className="h-8 w-8 lg:h-10 lg:w-10" />}
        color={iconColors["green"]}
        formattingFn={(num) => fCurrencyShorten(num)}
        isLoading={isLoading}
      />

      {/* Orders */}
      <Stat
        title="Orders"
        value={totalOrdersCount}
        rates={12}
        dateUnit={`last ${dateUnitLabel?.[numDays] ?? `${numDays} days`}`}
        icon={<MdOutlineShoppingCart className="h-8 w-8 lg:h-10 lg:w-10" />}
        color={iconColors["blue"]}
        isLoading={isLoading}
      />

      {/* Products Sold */}
      <Stat
        title="Products Sold"
        value={productsSold}
        rates={180}
        dateUnit={`last ${dateUnitLabel?.[numDays] ?? `${numDays} days`}`}
        icon={<FaBoxOpen className="h-8 w-8 lg:h-10 lg:w-10" />}
        color={iconColors["purple"]}
        formattingFn={(num) => formatNumber(num)}
        isLoading={isLoading}
      />

      {/* Active Customers */}
      <Stat
        title="Today's Visits"
        value={formatNumber(573)}
        rates={102}
        dateUnit="yesterday"
        icon={<FaUsers className="h-8 w-8 lg:h-10 lg:w-10" />}
        color={iconColors["default"]}
        formattingFn={(num) => formatNumber(num)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Stats;
