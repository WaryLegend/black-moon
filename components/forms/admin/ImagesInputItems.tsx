"use client";

import { memo } from "react";
import Image from "next/image";
import { HiX } from "react-icons/hi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { cn } from "@/utils/cn";
import type { DragAndDropImgDraft } from "@/types/dnd-image";
import Button from "@/components/ui/Button";

type SortableImageItemProps = {
  item: DragAndDropImgDraft;
  index: number;
  disabled?: boolean;
  onPreview: (imageUrl: string) => void;
  onRemove: (id: string) => void;
};

function SortableImageItem({
  item,
  index,
  disabled,
  onPreview,
  onRemove,
}: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.localId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-primary-200 bg-primary-0 hover:border-accent-600 relative h-24 w-24 rounded-lg border p-1 shadow-sm",
        isDragging && "opacity-30",
      )}
    >
      {index === 0 && (
        <span className="bg-accent-600 text-primary-0 absolute -top-2 left-2 z-10 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm">
          ẢNH CHÍNH
        </span>
      )}

      <div
        {...attributes}
        {...listeners}
        className="relative h-full w-full cursor-grab touch-none active:cursor-grabbing"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPreview(item.imageUrl);
          }}
          className="relative h-full w-full"
        >
          <Image
            src={item.imageUrl}
            alt="Preview"
            fill
            sizes="96px"
            className="rounded-md object-cover"
            draggable={false}
          />
        </button>
      </div>

      {!disabled && (
        <Button
          icon
          type="button"
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            onRemove(item.localId);
          }}
          className={cn(
            "bg-primary-200/55 hover:bg-primary-200 absolute -top-1 -right-1 z-20 rounded-full hover:text-red-600",
          )}
        >
          <HiX className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
}

export const MemoSortableImageItem = memo(SortableImageItem);

export function DragOverlayItem({ item }: { item: DragAndDropImgDraft }) {
  return (
    <div className="border-accent-500 bg-primary-0 relative h-24 w-24 scale-105 rounded-lg border-2 p-1 shadow-2xl">
      <Image
        src={item.imageUrl}
        alt="Drag"
        fill
        sizes="96px"
        className="rounded-md object-cover"
        draggable={false}
      />
    </div>
  );
}
