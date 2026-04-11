"use client";

import { FaPlusCircle } from "react-icons/fa";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import CreateProductVariantForm from "./CreateProductVariantForm";

export default function AddProductVariant() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-inventory-variant">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} /> Add new variant
          </Button>
        </Modal.Open>
        <Modal.Window name="add-inventory-variant">
          <CreateProductVariantForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
