import Button from "@/components/ui/Button";

type Action = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
};

type BulkSelectionToastProps = {
  selectedCount: number;
  confirmLabel?: string;
  disabled?: boolean;
  onCancel: () => void;
  actions: Action[];
};

export default function BulkSelectionToast({
  selectedCount,
  disabled = false,
  onCancel,
  actions,
}: BulkSelectionToastProps) {
  return (
    <div className="bg-primary-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg">
      <p className="text-primary-700 text-sm font-semibold">
        {selectedCount} selected
      </p>
      <Button
        type="button"
        size="small"
        variant="secondary"
        onClick={onCancel}
        disabled={disabled}
      >
        Hủy
      </Button>
      {actions.map((action, index) => (
        <Button
          key={index}
          type="button"
          size="small"
          variant={action.variant}
          onClick={action.onClick}
          disabled={disabled || action.disabled}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
