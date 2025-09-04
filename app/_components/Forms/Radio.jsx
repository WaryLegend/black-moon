import { getTextColor } from "@/app/_utils/helpers";

export default function Radio({ data = [], className = "", ...props }) {
  return (
    <div className={`flex gap-4 px-3 py-2 lg:gap-5 ${className}`}>
      {data.map((option) => {
        const { style: styleColor, color } = getTextColor(option.value);

        return (
          <label
            key={option.value}
            htmlFor={option.value}
            className="flex cursor-pointer items-center gap-0.5 lg:gap-1"
          >
            <input
              {...props}
              id={option.value}
              type="radio"
              value={option.value}
              className="h-3 w-3 rounded-full lg:h-4 lg:w-4"
              style={{
                accentColor: color ? color : "var(--color-accent-600)",
              }}
            />
            <span style={styleColor} className="rounded-sm font-semibold">
              {option.value}
            </span>
          </label>
        );
      })}
    </div>
  );
}
