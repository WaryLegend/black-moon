"use client";

import Modal from "@/app/_components/Modal";
import CreateVariantForm from "./CreateVariantForm";

import Button from "@/app/_components/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddVariant() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new variant
          </Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateVariantForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddVariant;
