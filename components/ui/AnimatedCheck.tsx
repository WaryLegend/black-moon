import "@/styles/animated-check.css";

export default function AnimatedCheck({ size = 52 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      className="animated-check text-accent-600"
    >
      <circle className="check-circle" cx="26" cy="26" r="25" fill="none" />
      <path className="check-mark" fill="none" d="M14 27l7 7 16-16" />
    </svg>
  );
}
