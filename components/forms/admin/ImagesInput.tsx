"use client";

import { useCallback, useRef, useState } from "react";
import type { ClipboardEvent } from "react";
import { HiLink, HiPhotograph, HiX } from "react-icons/hi";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  type DragEndEvent,
  type DragStartEvent,
  type DropAnimation,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import ImageViewer from "@/components/ui/ImageViewer";
import { cn } from "@/utils/cn";
import {
  type DragAndDropImgDraft,
  createNewDragAndDropImgDraft,
  createExistingDragAndDropImgDraft,
  revokeDragAndDropImgUrl,
} from "@/types/dnd-image";
import { DragOverlayItem, MemoSortableImageItem } from "./ImagesInputItems";

export type { DragAndDropImgDraft };
export {
  createNewDragAndDropImgDraft,
  createExistingDragAndDropImgDraft,
  revokeDragAndDropImgUrl,
};

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0.4" } },
  }),
};

// --- Component chính ---
export default function ImagesInput({
  items,
  onChange,
  disabled = false,
}: {
  items: DragAndDropImgDraft[];
  onChange: (items: DragAndDropImgDraft[]) => void;
  disabled?: boolean;
}) {
  const [activeItem, setActiveItem] = useState<DragAndDropImgDraft | null>(
    null,
  );
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isOverDropzone, setIsOverDropzone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const appendFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length || disabled) return;
      const nextDrafts = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .map(createNewDragAndDropImgDraft);

      if (nextDrafts.length) onChange([...items, ...nextDrafts]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [items, onChange, disabled],
  );

  const removeImage = useCallback(
    (id: string) => {
      const target = items.find((i) => i.localId === id);
      if (target) revokeDragAndDropImgUrl(target);
      onChange(items.filter((i) => i.localId !== id));
    },
    [items, onChange],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const target = items.find(
        (item) => item.localId === String(event.active.id),
      );
      setActiveItem(target ?? null);
    },
    [items],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((i) => i.localId === active.id);
        const newIndex = items.findIndex((i) => i.localId === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
          onChange(arrayMove(items, oldIndex, newIndex));
        }
      }
      setActiveItem(null);
    },
    [items, onChange],
  );

  const handleDragCancel = useCallback(() => {
    setActiveItem(null);
  }, []);

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      const clipboardItems = event.clipboardData.items;
      for (let index = 0; index < clipboardItems.length; index += 1) {
        const candidate = clipboardItems[index];
        if (!candidate.type.startsWith("image/")) continue;
        const file = candidate.getAsFile();
        if (!file) continue;
        onChange([...items, createNewDragAndDropImgDraft(file)]);
        break;
      }
    },
    [disabled, items, onChange],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 1. KHU VỰC KÉO THẢ / CHỌN FILE */}
      <div
        className={cn(
          "relative flex h-35 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
          isOverDropzone
            ? "border-accent-500 bg-accent-50/10"
            : "border-primary-300 bg-primary-50/10",
          disabled && "cursor-not-allowed opacity-60",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsOverDropzone(true);
        }}
        onDragLeave={() => setIsOverDropzone(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsOverDropzone(false);
          appendFiles(e.dataTransfer.files);
        }}
      >
        <HiPhotograph className="text-primary-400 mb-2 h-10 w-10" />
        <p className="text-primary-600 text-sm">
          Kéo thả ảnh vào đây hoặc{" "}
          <span
            onClick={() => !disabled && fileInputRef.current?.click()}
            className={cn(
              "text-accent-600 hover:underline",
              disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
            )}
          >
            chọn file ảnh
          </span>
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/*"
          disabled={disabled}
          onChange={(e) => appendFiles(e.target.files)}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-primary-300 h-px flex-1"></div>
        <span className="text-primary-600 text-xs font-medium whitespace-nowrap">
          HOẶC
        </span>
        <div className="bg-primary-300 h-px flex-1"></div>
      </div>

      {/* 2. KHU VỰC ĐIỀU KHIỂN (Paste vào đây) */}
      <div className="flex items-center gap-2">
        <div
          className="group relative flex-1"
          onPaste={handlePaste} // Lắng nghe dán ảnh tại ô input
        >
          <HiLink className="text-primary-400 absolute top-1/2 left-3 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            placeholder="Dán đường liên kết của hình ảnh"
            className="border-accent-300 bg-primary-0 disabled:bg-primary-300 hover:border-accent-700 focus:ring-accent-500/50 w-full rounded-lg border py-2 pr-3 pl-9 text-sm transition-all outline-none focus:ring-2"
            disabled={disabled}
          />
        </div>
      </div>

      {/* 3. Sortable Area */}
      {items.length > 0 ? (
        <div className="min-h-[100px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={items.map((i) => i.localId)}
              strategy={rectSortingStrategy}
            >
              <div className="flex flex-wrap gap-3">
                {items.map((item, index) => (
                  <MemoSortableImageItem
                    key={item.localId}
                    item={item}
                    index={index}
                    disabled={disabled}
                    onPreview={setPreviewImageUrl}
                    onRemove={removeImage}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Drag Overlay: Cái bóng đi theo chuột */}
            <DragOverlay dropAnimation={dropAnimation}>
              {activeItem ? <DragOverlayItem item={activeItem} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : null}

      {/* Preview Modal */}
      {previewImageUrl && (
        <div
          role="dialog"
          className="bg-primary-900/20 fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div
            className="bg-primary-0 relative max-h-full max-w-4xl rounded-2xl p-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImageUrl(null)}
              type="button"
              className="hover:bg-primary-100 absolute top-3 right-3 z-10 rounded-full p-1 shadow-lg transition-all"
            >
              <HiX className="h-6 w-6" />
            </button>
            <ImageViewer src={previewImageUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
