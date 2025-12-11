"use client";

import { useOrdersByDateRange } from "@/app/_components/Adashboard/useOrdersByDateRange";
import { useDarkModeStore } from "@/app/_context/DarkModeStore";
import {
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO,
  subDays,
} from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import Spinner from "@/app/_components/Spinner";

export default function SalesChart() {
  const { isDarkMode } = useDarkModeStore();
  const { isLoading, orders, numDays } = useOrdersByDateRange();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDays.map((date) => ({
    label: format(date, "MMM dd"),
    totalRevenue: orders
      .filter(
        (order) =>
          order.status === "delivered" &&
          isSameDay(date, parseISO(order.createdAt)),
      )
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0),
  }));

  const gridColor = isDarkMode ? "#4b5563" : "#d1d5db";
  const textColor = isDarkMode ? "#d1d5db" : "#4b5563";

  return (
    <div className="bg-primary-0 rounded-lg p-4 shadow-md">
      <h2 className="text-primary-600 mb-6 text-lg font-semibold">
        Revenue Trend{" "}
        <span className="text-primary-600 text-sm font-normal">
          ({format(allDays[0], "MMM dd")} —{" "}
          {format(allDays.at(-1), "MMM dd yyyy")})
        </span>
      </h2>

      {isLoading ? (
        <div className="flex h-[75%] w-full items-center justify-center">
          <Spinner color="var(--color-accent-600)" />
        </div>
      ) : (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isDarkMode ? "#818cf8" : "#3f566d"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDarkMode ? "#4f46e5" : "#3f566d"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="4" stroke={gridColor} />

              <XAxis
                dataKey="label"
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: textColor, fontSize: 12 }}
                tickLine={false}
                width={60}
              />
              <Area
                type="monotone"
                dataKey="totalRevenue"
                stroke={isDarkMode ? "#818cf8" : "#526d8a"}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={3}
                name="Revenue"
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend
                verticalAlign="bottom"
                align="center"
                height={50}
                iconType="line"
                wrapperStyle={{ paddingTop: "10px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
