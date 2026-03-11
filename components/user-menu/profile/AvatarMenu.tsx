"use client";

import { HiEye } from "react-icons/hi2";
import { HiPhotograph } from "react-icons/hi";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";

function AvatarMenu({ img }: { img?: string | null }) {
  const handleViewImage = () => {
    if (img) {
      // Navigate to image view page or open in modal
      window.open(img, "_blank");
    }
  };

  return (
    <>
      {/* View Image - only if avatar exists */}
      {img && (
        <Menus.Button icon={<HiEye />} onClick={handleViewImage}>
          Xem ảnh
        </Menus.Button>
      )}
      {/* Change/Add Image */}
      <Modal.Open opens="change-avatar">
        <Menus.Button icon={<HiPhotograph />}>
          {img ? "Thay đổi ảnh" : "Thêm ảnh"}
        </Menus.Button>
      </Modal.Open>
    </>
  );
}

export default AvatarMenu;
