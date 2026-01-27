"use client";

import Modal from "@/components/ui/Modal";
import CreateUserForm from "./CreateUserForm";

import Button from "@/components/ui/Button";
import { FaPlusCircle } from "react-icons/fa";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button
            type="button"
            className="flex items-center justify-center gap-1"
          >
            <FaPlusCircle size={20} />
            Add new user
          </Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
