"use client";

import Modal from "@/components/ui/Modal";
import CreateVariantForm from "./CreateVariantForm";

import Button from "@/components/ui/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddVariant() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="variant-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new variant
          </Button>
        </Modal.Open>
        <Modal.Window name="variant-form">
          <CreateVariantForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddVariant;
