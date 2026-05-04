"use client";

import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import Button from "@/components/ui/Button";
import { useCurrentAccount } from "@/hooks/useCurrentAccount";

import { useWishlist } from "./useWishlist";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "./useWishlistMutations";

type AddToWishListProps = {
  variantId: number | null;
  className?: string;
};

function AddToWishList({ variantId, className = "" }: AddToWishListProps) {
  const router = useRouter();
  const { data: user, isPending: isUserPending } = useCurrentAccount();
  const { data } = useWishlist();
  const { mutateAsync: addItem, isPending: isAdding } = useAddToWishlist();
  const { mutateAsync: removeItem, isPending: isRemoving } =
    useRemoveFromWishlist();

  const existingItem = data?.items.find(
    (item) => item.variant?.id === variantId,
  );
  const isInWishlist = Boolean(existingItem);
  const isPending = isAdding || isRemoving;

  const handleToggle = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!variantId) return;

    if (isUserPending) return;

    if (!user?.id) {
      router.push("/user/login");
      return;
    }

    if (isInWishlist && existingItem) {
      await removeItem(existingItem.id);
      return;
    }

    await addItem(variantId);
  };

  return (
    <Button
      icon
      className="hover:text-accent-700 rounded-full hover:scale-105"
      onClick={handleToggle}
      disabled={isPending || !variantId}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ? (
        <FaHeart className={className} />
      ) : (
        <FaRegHeart className={className} />
      )}
    </Button>
  );
}

export default AddToWishList;
