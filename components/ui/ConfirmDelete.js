import Button from "@/components/ui/Button";

function ConfirmDelete({
  actionName,
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <h3 className="text-2xl font-medium">
        {actionName || "Xóa"} <span className="font-bold">{resourceName}</span>
      </h3>

      <p className="text-primary-800 mb-3">
        Bạn có chắc chắn muốn{" "}
        <span className="lowercase">{actionName || "xóa"}</span>{" "}
        <b>{resourceName}</b> vĩnh viễn không? Hành động này không thể hoàn tác.
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={onCloseModal}>
          Hủy
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Xóa
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
