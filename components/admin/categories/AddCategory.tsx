"use client";

import Modal from "@/components/ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

import Button from "@/components/ui/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new category
          </Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateCategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCategory;
