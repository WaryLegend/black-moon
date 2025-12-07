"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useRef, useEffect } from "react";
import { useOrdersByDateRange } from "@/app/_hooks/useOrdersByDateRange";
import { useDarkModeStore } from "@/app/_context/DarkModeStore";
import ChartTypeToggle from "./ChartTypeToggle";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";
import Spinner from "@/app/_components/Spinner";

const COLORS_LIGHT = [
  "#8b5cf6",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#84cc16",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#d946ef",
];
const COLORS_DARK = [
  "#a78bfa",
  "#60a5fa",
  "#22d3ee",
  "#34d399",
  "#a3e635",
  "#fbbf24",
  "#f87171",
  "#f472b6",
  "#e879f9",
];

export default function TopSalesChart() {
  const [containerWidth, setContainerWidth] = useState(0);
  const [chartType, setChartType] = useState("category");
  const containerRef = useRef(null);

  const { isDarkMode } = useDarkModeStore();
  const COLORS = isDarkMode ? COLORS_DARK : COLORS_LIGHT;

  // Check if legend should wrap based on container width
  const shouldWrapLegend = containerWidth < 600;
  const { isLoading, salesByCategory, salesByProduct } = useOrdersByDateRange();

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      setContainerWidth(width);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Get chart data based on selected type
  const getChartData = () => {
    const sourceData =
      chartType === "category" ? salesByCategory : salesByProduct;

    return sourceData.slice(0, 10).map((item, index) => ({
      name: item.name,
      value: item.totalSales,
      color: COLORS[index % COLORS.length],
    }));
  };

  const data = getChartData();

  return (
    <div
      ref={containerRef}
      className="border-primary-200 bg-primary-0 rounded-lg p-4 shadow-md"
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-primary-600 text-xl font-semibold">Top Sales</h2>
        {/* Toggle Button */}
        <ChartTypeToggle chartType={chartType} onClick={setChartType} />
      </div>
      {isLoading && (
        <div className="flex h-[75%] w-full items-center justify-center">
          <Spinner color="var(--color-accent-600)" />
        </div>
      )}
      {!isLoading && data.length === 0 ? (
        <p className="text-primary-500 py-12 text-center">No date found.</p>
      ) : (
        <div
          className={`flex items-center ${
            shouldWrapLegend ? "flex-col" : "flex-row gap-6"
          }`}
        >
          <div className="w-full min-w-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend on the right for wide containers, below for narrow */}
          <CustomLegend
            data={data}
            payload={data.map((item) => ({
              name: item.name,
              color: item.color,
            }))}
          />
        </div>
      )}
    </div>
  );
}
