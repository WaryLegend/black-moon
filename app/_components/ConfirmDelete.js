import Button from "@/app/_components/Button";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-[40rem] flex-col gap-3">
      <h3 className="text-2xl font-medium">Delete {resourceName}</h3>

      <p className="text-grey-500 mb-3">
        Are you sure you want to delete this <b>{resourceName}</b> permanently?
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
