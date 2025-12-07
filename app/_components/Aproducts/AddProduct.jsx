"use client";

import Modal from "@/app/_components/Modal";
import CreateProductForm from "./CreateProductForm";
import Button from "@/app/_components/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddProduct() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new product
          </Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProduct;
