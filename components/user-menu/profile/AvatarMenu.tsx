"use client";

import { HiEye } from "react-icons/hi2";
import { HiPhotograph } from "react-icons/hi";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";

function AvatarMenu({ img }: { img?: string | null }) {
  return (
    <>
      {/* View Image - only if avatar exists */}
      {img && (
        <Modal.Open opens="view-avatar">
          <Menus.Button icon={<HiEye />}>Xem ảnh</Menus.Button>
        </Modal.Open>
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
