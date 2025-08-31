function FormRow({ label, error, children }) {
  return (
    <div
      className={`border-primary-100 grid grid-cols-[1fr_1.2fr_1fr] items-center gap-6 py-3 text-[1rem] not-last:border-b first:pt-0 last:pb-0 [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-3`}
    >
      {label && (
        <label htmlFor={children.props?.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
