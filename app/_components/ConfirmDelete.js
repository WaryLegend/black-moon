import Button from "@/app/_components/Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-xl flex-col gap-3">
      <h3 className="text-2xl font-medium">
        Xóa <span className="font-bold"> {resourceName}</span>
      </h3>

      <p className="text-grey-500 mb-3">
        Bạn có chắc chắn muốn xóa <b>{resourceName}</b> vĩnh viễn không? Hành
        động này không thể hoàn tác.
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
