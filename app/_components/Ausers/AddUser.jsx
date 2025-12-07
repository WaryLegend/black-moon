"use client";

import Modal from "@/app/_components/Modal";
import CreateUserForm from "./CreateUserForm";

import Button from "@/app/_components/Button";
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
