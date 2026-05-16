import Button from "@/components/ui/Button";
import { ReactNode } from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";

type ConfirmDeleteProps = {
  actionName?: string;
  message?: string | ReactNode;
  onConfirm?: () => void | Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
};

function ConfirmDelete({
  message,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  const handleConfirm = async () => {
    if (!onConfirm) return;
    await onConfirm();
    onCloseModal?.();
  };

  return (
    <div className="flex max-w-xl flex-col gap-3">
      <h3 className="text-xl font-bold">Xác nhận xóa</h3>

      <div className="text-primary-800 mb-2 text-base">
        {!message ? (
          <>
            Bạn có chắc chắn muốn xóa vĩnh viễn không? Hành động này không thể
            hoàn tác.
          </>
        ) : typeof message === "string" ? (
          <>
            Bạn có chắc chắn muốn <b>{message}</b>?
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

export default ConfirmDelete;
