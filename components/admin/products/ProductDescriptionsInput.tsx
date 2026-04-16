"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DropAnimation,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Input from "@/components/forms/admin/Input";
import RichTextEditor from "@/components/forms/admin/RichTextEditor";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { HiXMark } from "react-icons/hi2";
import { LuArrowUpDown } from "react-icons/lu";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export type ProductDescriptionDraft = {
  key: string;
  id?: number;
  title: string;
  contentHtml: string;
  plainText: string;
  isDeleted: boolean;
};

type ProductDescriptionsInputProps = {
  value: ProductDescriptionDraft[];
  onChange: (nextValue: ProductDescriptionDraft[]) => void;
  mode: "create" | "edit";
  disabled?: boolean;
  className?: string;
  onSaveItem?: (id: string) => void;
  canSaveItem?: (item: ProductDescriptionDraft) => boolean;
  savingItemIds?: string[];
};

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        // Item gốc phía sau khi drag sẽ mờ đi, không bị ẩn hoàn toàn.
        opacity: "0.35",
      },
    },
  }),
};

const plainTextFromHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const createEmptyDraft = (): ProductDescriptionDraft => ({
  key:
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `desc-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  title: "",
  contentHtml: "",
  plainText: "",
  isDeleted: false,
});

function SortableDescriptionCard({
  item,
  mode,
  disabled,
  onTitleChange,
  onContentChange,
  onRemove,
  onToggleDeleted,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onSaveItem,
  canSaveItem,
  isSaving,
}: {
  item: ProductDescriptionDraft;
  mode: "create" | "edit";
  disabled: boolean;
  onTitleChange: (id: string, title: string) => void;
  onContentChange: (id: string, html: string) => void;
  onRemove: (id: string) => void;
  onToggleDeleted: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onSaveItem?: (id: string) => void;
  canSaveItem?: (item: ProductDescriptionDraft) => boolean;
  isSaving?: boolean;
}) {
  const isNewDescription = item.id === undefined;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.key, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  } as const;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "border-primary-200 bg-primary-0 space-y-3 rounded-xl border p-3 shadow-lg",
        item.isDeleted && "bg-primary-100/70",
      )}
    >
      <div
        className="flex items-center gap-2"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <label
          htmlFor={item.key}
          className="text-primary-700 min-w-16 font-medium"
        >
          Tiêu đề*
        </label>
        <Input
          id={item.key}
          value={item.title}
          onChange={(event) => onTitleChange(item.key, event.target.value)}
          placeholder="Nhập tiêu đề"
          disabled={disabled}
          className="flex-1"
        />

        {mode === "create" ? (
          <Button
            icon
            type="button"
            onClick={() => onRemove(item.key)}
            disabled={disabled}
            title="Gỡ bỏ"
            className="rounded-full border-1 bg-red-50 text-sm font-bold text-red-600 not-disabled:hover:bg-red-200 not-disabled:hover:text-red-800"
          >
            <HiXMark className="h-5 w-5" />
          </Button>
        ) : (
          <>
            {/* Ở mode edit: chỉ cho gỡ bỏ các description mới tạo (chưa có id). */}
            {isNewDescription && (
              <Button
                icon
                type="button"
                onClick={() => onRemove(item.key)}
                disabled={disabled}
                title="Gỡ bỏ"
                className="rounded-full border-1 bg-red-50 text-sm font-bold text-red-600 not-disabled:hover:bg-red-200 not-disabled:hover:text-red-800"
              >
                <HiXMark className="h-5 w-5" />
              </Button>
            )}

            {/* Save theo từng item chỉ dành cho mode edit và chỉ hiện
                khi item đó được parent xác định là đang dirty. */}
            {canSaveItem?.(item) && (
              <Button
                type="button"
                variant="secondary"
                title="Lưu thay đổi"
                onClick={() => onSaveItem?.(item.key)}
                disabled={disabled || isSaving}
                className={cn(
                  "rounded-md border-none bg-green-600 px-2 py-1 text-sm font-semibold text-green-100 shadow-lg not-disabled:hover:bg-green-300 not-disabled:hover:text-green-600",
                  isSaving && "opacity-50",
                )}
              >
                Save
              </Button>
            )}
          </>
        )}
        <Button
          {...attributes}
          {...listeners}
          icon
          type="button"
          disabled={disabled}
          className={cn(
            "text-accent-500 not-disabled:hover:text-accent-700 cursor-grab rounded-full",
            "disabled:opacity-50",
          )}
          aria-label="Kéo để đổi vị trí"
          title="Giữ và kéo"
        >
          <LuArrowUpDown className="h-5 w-5" />
        </Button>
      </div>

      <div
        className="space-y-2"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            id={`label-${item.key}`}
            className="text-primary-700 block font-medium"
          >
            Nội dung
          </span>

          <div className="flex items-center gap-2">
            {mode === "edit" ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => onToggleDeleted(item.key)}
                disabled={disabled}
                className={cn(
                  "rounded-none border px-2 py-1 text-xs font-semibold",
                  item.isDeleted
                    ? "border-amber-400 text-amber-600 not-disabled:hover:bg-amber-50 not-disabled:hover:text-amber-700"
                    : "border-green-400 text-green-600 not-disabled:hover:bg-green-50 not-disabled:hover:text-green-700",
                )}
              >
                {item.isDeleted ? "Đang ẩn" : "Đang hiển thị"}
              </Button>
            ) : (
              ""
            )}
            <Button
              icon
              type="button"
              onClick={() => onMoveUp(item.key)}
              disabled={disabled || !canMoveUp}
              title="Đưa lên"
              className="text-primary-600 rounded-full border-1 disabled:opacity-50"
            >
              <FaAngleUp className="h-5 w-5" />
            </Button>
            <Button
              icon
              type="button"
              onClick={() => onMoveDown(item.key)}
              disabled={disabled || !canMoveDown}
              title="Đưa xuống"
              className="text-primary-600 rounded-full border-1 disabled:opacity-50"
            >
              <FaAngleDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div aria-labelledby={`label-${item.key}`}>
          <RichTextEditor
            value={item.contentHtml}
            onChange={(html) => onContentChange(item.key, html)}
            disabled={disabled}
            minHeight="10rem"
          />
        </div>
      </div>
    </div>
  );
}

// Dragging Item
function DescriptionOverlay({ item }: { item: ProductDescriptionDraft }) {
  return (
    <div className="border-accent-600 bg-primary-0 w-full rounded-xl border-2 p-3 shadow-xl">
      <div className="text-primary-700 mb-2 text-sm font-semibold">
        {item.title || "(Chưa có tiêu đề)"}
      </div>
      <div className="text-primary-500 truncate text-sm">
        {item.plainText || "(Chưa có nội dung)"}
      </div>
    </div>
  );
}

export function normalizeDescriptionDrafts(
  items: Array<{
    id: number;
    title: string;
    contentHtml: string;
    plainText?: string;
    isDeleted?: boolean;
  }>,
): ProductDescriptionDraft[] {
  return items.map((item) => ({
    key:
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `desc-${item.id}-${Math.random().toString(16).slice(2)}`,
    id: item.id,
    title: item.title,
    contentHtml: item.contentHtml,
    plainText: item.plainText ?? plainTextFromHtml(item.contentHtml),
    isDeleted: Boolean(item.isDeleted),
  }));
}

export default function ProductDescriptionsInput({
  value,
  onChange,
  mode,
  disabled = false,
  className,
  onSaveItem,
  canSaveItem,
  savingItemIds = [],
}: ProductDescriptionsInputProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Tăng ngưỡng kéo để hạn chế drag nhầm khi đang tương tác editor/input.
        distance: 8,
      },
    }),
  );

  // Reorder nhanh bằng nút lên/xuống (ngoài drag-and-drop).
  const moveByButton = (id: string, direction: -1 | 1) => {
    const index = value.findIndex((item) => item.key === id);
    if (index === -1) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= value.length) return;
    onChange(arrayMove(value, index, targetIndex));
  };

  const activeItem = useMemo(
    () => value.find((item) => item.key === activeId) ?? null,
    [activeId, value],
  );

  const updateItem = (
    key: string,
    updater: (item: ProductDescriptionDraft) => ProductDescriptionDraft,
  ) => {
    onChange(value.map((item) => (item.key === key ? updater(item) : item)));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.findIndex((item) => item.key === active.id);
      const newIndex = value.findIndex((item) => item.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        onChange(arrayMove(value, oldIndex, newIndex));
      }
    }
    setActiveId(null);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {value.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext
            items={value.map((item) => item.key)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {value.map((item) => (
                <SortableDescriptionCard
                  key={item.key}
                  item={item}
                  mode={mode}
                  disabled={disabled}
                  canMoveUp={value[0]?.key !== item.key}
                  canMoveDown={value[value.length - 1]?.key !== item.key}
                  onTitleChange={(id, title) => {
                    updateItem(id, (current) => ({ ...current, title }));
                  }}
                  onContentChange={(id, contentHtml) => {
                    updateItem(id, (current) => ({
                      ...current,
                      contentHtml,
                      plainText: plainTextFromHtml(contentHtml),
                    }));
                  }}
                  onRemove={(id) => {
                    onChange(value.filter((item) => item.key !== id));
                  }}
                  onToggleDeleted={(id) => {
                    updateItem(id, (current) => ({
                      ...current,
                      isDeleted: !current.isDeleted,
                    }));
                  }}
                  onMoveUp={(id) => moveByButton(id, -1)}
                  onMoveDown={(id) => moveByButton(id, 1)}
                  onSaveItem={onSaveItem}
                  canSaveItem={canSaveItem}
                  isSaving={savingItemIds.includes(item.key)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeItem ? <DescriptionOverlay item={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      ) : null}

      <Button
        type="button"
        variant="secondary"
        size="small"
        disabled={disabled}
        onClick={() => {
          onChange([...value, createEmptyDraft()]);
        }}
      >
        Thêm mô tả
      </Button>
    </div>
  );
}
