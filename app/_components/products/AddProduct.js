// import Modal from "../../ui/Modal";
// import CreateCabinForm from "./CreateCabinForm";

import Button from "@/app/_components/Button";

function AddProduct() {
  return (
    <div>
      {/* <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal> */}
      <Button type="button">Add new Cabin</Button>
    </div>
  );
}

export default AddProduct;
