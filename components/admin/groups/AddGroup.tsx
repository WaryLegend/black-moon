"use client";

import Modal from "@/components/ui/Modal";
import CreateGroupForm from "./CreateGroupForm";

import Button from "@/components/ui/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddGroup() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="group-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new group
          </Button>
        </Modal.Open>
        <Modal.Window name="group-form">
          <CreateGroupForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGroup;
