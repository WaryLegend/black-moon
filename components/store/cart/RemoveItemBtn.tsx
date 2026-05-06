"use client";

import { HiXMark } from "react-icons/hi2";

import Button from "@/components/ui/Button";

import { useCartActions } from "./useCartActions";

type RemoveItemBtnProps = {
  itemId: number | string;
};

function RemoveItemBtn({ itemId }: RemoveItemBtnProps) {
  const { removeItem } = useCartActions();

  return (
    <Button
      aria-label="Remove item"
      icon
      className="hover:text-accent-700 rounded-full font-bold"
      onClick={() => removeItem(itemId)}
    >
      <HiXMark className="h-6 w-6" />
    </Button>
  );
}

export default RemoveItemBtn;
