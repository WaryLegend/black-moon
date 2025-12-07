export default function Form({ type = "regular", className = "", ...props }) {
  const base = "overflow-hidden text-sm";
  const regular =
    "px-16 py-10 bg-primary-50 border border-primary-100 rounded-lg";
  const modal = "w-auto lg:w-[60rem]";

  return (
    <form
      {...props}
      className={`${base} ${type === "regular" ? regular : ""} ${
        type === "modal" ? modal : ""
      } ${className}`}
    />
  );
}
