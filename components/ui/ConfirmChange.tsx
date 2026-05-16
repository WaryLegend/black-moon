import Button from "@/components/ui/Button";
import { ReactNode } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";

type ConfirmChangeProps = {
  title?: string;
  message?: string | ReactNode;
  onConfirm?: () => void | Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function ConfirmChange({
  title = "Confirm Change",
  message,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmChangeProps) {
  const handleConfirm = async () => {
    if (!onConfirm) return;
    await onConfirm();
    onCloseModal?.();
  };

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <h3 className="text-xl font-bold">{title}</h3>

      <div className="text-primary-500 mb-2 text-base">
        {!message ? (
          "Are you sure you want to make this change?"
        ) : typeof message === "string" ? (
          <>
            Are you sure you want to <b>{message}</b>?
          </>
        ) : (
          message
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={onCloseModal}>
          <HiXMark className="h-5 w-5" />
        </Button>
        <Button variant="danger" disabled={disabled} onClick={handleConfirm}>
          <HiCheck className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ConfirmChange;
