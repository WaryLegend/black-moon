import { type CSSProperties, type HTMLAttributes } from "react";

type SpinnerType = "circle" | "bar" | "mini";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  type?: SpinnerType;
  color?: string;
  size?: number;
  className?: string;
}

const variantToClass: Record<SpinnerType, string> = {
  circle: "spinner",
  bar: "spinnerbar",
  mini: "spinner-mini",
};

export default function Spinner({
  type = "circle",
  className = "",
  color,
  size,
}: SpinnerProps) {
  const style: CSSProperties = {
    ...(color && ({ "--spinner-color": color } as CSSProperties)),
    ...(size !== undefined &&
      ({ "--spinner-size": `${size}px` } as CSSProperties)),
  };

  const baseClass = variantToClass[type] ?? "spinner";

  return (
    <div
      className={`${baseClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
