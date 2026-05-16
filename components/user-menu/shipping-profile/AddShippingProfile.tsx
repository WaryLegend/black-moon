"use client";

import { FaPlusCircle } from "react-icons/fa";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import CreateShippingProfileForm from "./CreateShippingProfileForm";

function AddShippingProfile() {
  return (
    <Modal>
      <Modal.Open opens="shipping-profile-form">
        <Button type="button" className="flex items-center gap-2">
          <FaPlusCircle size={18} />
          Thêm địa chỉ mới
        </Button>
      </Modal.Open>
      <Modal.Window name="shipping-profile-form">
        <CreateShippingProfileForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddShippingProfile;
