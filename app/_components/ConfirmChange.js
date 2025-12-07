import Button from "@/app/_components/Button";
import { capitalizeFirst } from "@/app/_utils/helpers";

function ConfirmChange({
  actionName,
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <h3 className="text-2xl font-medium">
        {actionName || "Thay đổi"}{" "}
        <span className="font-bold"> {resourceName}</span>
      </h3>

      <p className="text-grey-500 mb-3">
        Bạn có chắc chắn muốn{" "}
        <span className="lowercase">{actionName || "xóa"}</span>{" "}
        <b>{resourceName}</b> không?
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={onCloseModal}>
          Hủy
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          {capitalizeFirst(actionName)}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmChange;
