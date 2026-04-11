"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  MdArrowDropDown,
  MdCode,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatQuote,
  MdFormatUnderlined,
  MdOpenInNew,
  MdOutlineSubdirectoryArrowLeft,
  MdRedo,
  MdUndo,
  MdLink,
  MdDeleteOutline,
} from "react-icons/md";
import {
  LuHeading,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
} from "react-icons/lu";
import type { Level } from "@tiptap/extension-heading";
import { GoListOrdered } from "react-icons/go";
import { cn } from "@/utils/cn";

const HEADING_LEVELS: Level[] = [1, 2, 3, 4];

type RichTextEditorProps = {
  value: string;
  onChange: (nextValue: string) => void;
  disabled?: boolean;
  /**
   * Accept either a full tailwind class (min-h-[12rem]), a unit string ("12rem", "100px", "10em", "%")
   * or a number (treated as pixels). The component builds the final `min-h-[...]` class.
   */
  minHeight?: string | number;
  className?: string;
};

const DEFAULT_EDITOR_UI_STATE = {
  isBold: false,
  isItalic: false,
  isUnderline: false,
  headingLevel: 0,
  isBlockquote: false,
  isCodeBlock: false,
  isBulletList: false,
  isOrderedList: false,
  textAlign: "left",
  isLink: false,
  linkHref: "",
  hasSelection: false,
  canUndo: false,
  canRedo: false,
};

type ToolbarButtonProps = {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ComponentType<{ size?: number }>;
};

function ToolbarButton({
  title,
  onClick,
  isActive = false,
  disabled = false,
  icon: Icon,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded-md p-2 transition-all duration-200",
        isActive
          ? "bg-accent-100 text-accent-700"
          : "text-primary-700 not-disabled:hover:bg-primary-200",
        disabled && "opacity-50",
      )}
    >
      <Icon size={18} />
    </button>
  );
}

type DropdownProps = {
  label: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

function ToolbarDropdown({
  label,
  title,
  isOpen,
  onToggle,
  children,
  isActive = false,
  disabled = false,
}: DropdownProps) {
  return (
    <div className="relative">
      <button
        type="button"
        title={title}
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-200",
          isActive
            ? "bg-accent-100 text-accent-700"
            : "text-primary-700 not-disabled:hover:bg-primary-100",
          disabled && "opacity-50",
        )}
      >
        <span className="flex items-center">{label}</span>
        <MdArrowDropDown size={16} />
      </button>

      <div
        className={cn(
          "bg-primary-0 border-primary-300 absolute top-[110%] left-0 z-30 min-w-[11rem] origin-top-left rounded-md border p-1 shadow-lg transition-all duration-150",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DropdownItem({
  label,
  onClick,
  isActive = false,
  icon,
}: {
  label: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
}) {
  const Icon = icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded px-2 py-1.5 text-left text-xs transition",
        isActive
          ? "bg-accent-100 text-accent-700"
          : "text-primary-700 hover:bg-primary-100",
      )}
    >
      <span className="flex items-center gap-2">
        {Icon ? <Icon size={14} /> : null}
        <span>{label}</span>
      </span>
    </button>
  );
}

const HEADING_ICON_MAP: Record<
  number,
  React.ComponentType<{ size?: number }>
> = {
  0: LuHeading,
  1: LuHeading1,
  2: LuHeading2,
  3: LuHeading3,
  4: LuHeading4,
};

export default function RichTextEditor({
  value,
  onChange,
  disabled = false,
  minHeight = "12rem", // 160px
  className = "",
}: RichTextEditorProps) {
  const buildMinHeightClass = (v?: string | number) => {
    if (v == null) return "";
    if (typeof v === "number") return `min-h-[${v}px]`;
    const s = String(v).trim();
    // If caller already passed a Tailwind min-h- class, keep it as-is
    if (s.startsWith("min-h-")) return s;
    // If only digits, assume px
    if (/^\d+$/.test(s)) return `min-h-[${s}px]`;
    // If contains a unit (px, rem, em, %, vh, vw, etc.), use it directly
    if (/\d+(px|rem|em|vh|vw|%)$/i.test(s) || /[a-z%]$/.test(s)) {
      return `min-h-[${s}]`;
    }
    // Fallback: wrap whatever was provided
    return `min-h-[${s}]`;
  };

  const minHeightClass = buildMinHeightClass(minHeight);
  const [openMenu, setOpenMenu] = useState<"text" | "list" | null>(null);
  const [isLinkPanelOpen, setIsLinkPanelOpen] = useState(false);
  const [linkInputValue, setLinkInputValue] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linkInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: HEADING_LEVELS,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  const editorUiState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) {
        return DEFAULT_EDITOR_UI_STATE;
      }

      return {
        isBold: currentEditor.isActive("bold"),
        isItalic: currentEditor.isActive("italic"),
        isUnderline: currentEditor.isActive("underline"),
        headingLevel:
          HEADING_LEVELS.find((level) =>
            currentEditor.isActive("heading", { level }),
          ) ?? 0,
        isBlockquote: currentEditor.isActive("blockquote"),
        isCodeBlock: currentEditor.isActive("codeBlock"),
        isBulletList: currentEditor.isActive("bulletList"),
        isOrderedList: currentEditor.isActive("orderedList"),
        isLink: currentEditor.isActive("link"),
        linkHref: String(currentEditor.getAttributes("link").href ?? ""),
        hasSelection: !currentEditor.state.selection.empty,
        textAlign: currentEditor.isActive({ textAlign: "center" })
          ? "center"
          : currentEditor.isActive({ textAlign: "right" })
            ? "right"
            : currentEditor.isActive({ textAlign: "justify" })
              ? "justify"
              : "left",
        canUndo: currentEditor.can().chain().focus().undo().run(),
        canRedo: currentEditor.can().chain().focus().redo().run(),
      };
    },
  });
  const uiState = editorUiState ?? DEFAULT_EDITOR_UI_STATE;

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setIsLinkPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    const nextHtml = value || "";
    if (currentHtml === nextHtml) return;
    editor.commands.setContent(nextHtml, { emitUpdate: false });
  }, [editor, value]);

  useEffect(() => {
    if (uiState.isLink) {
      setIsLinkPanelOpen(true);
      setLinkInputValue(uiState.linkHref || "");
    } else {
      setIsLinkPanelOpen(false);
      setLinkInputValue("");
    }
  }, [uiState.isLink, uiState.linkHref]);

  useEffect(() => {
    if (!isLinkPanelOpen) return;
    linkInputRef.current?.focus();
  }, [isLinkPanelOpen]);

  if (!editor) {
    return (
      <div
        className={`border-primary-300 bg-primary-50 rounded border px-3 py-2 text-sm ${minHeightClass}`}
      />
    );
  }

  const disableActions = disabled;
  const HeadingLabelIcon = HEADING_ICON_MAP[uiState.headingLevel] ?? LuHeading;
  const listLabelIcon = uiState.isOrderedList
    ? GoListOrdered
    : MdFormatListBulleted;
  const ListLabelIcon = listLabelIcon;

  const applyLink = () => {
    if (!editor) return;
    const url = linkInputValue.trim();

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkPanelOpen(false);
      return;
    }

    // Nếu có bôi đen hoặc đang ở trên link cũ: Cập nhật link
    if (uiState.hasSelection || uiState.isLink) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      // Nếu không bôi đen: Chèn text link mới
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    }

    setIsLinkPanelOpen(false);
  };

  const openLinkInNewTab = () => {
    const nextUrl = linkInputValue.trim();
    if (!nextUrl) return;
    window.open(nextUrl, "_blank", "noopener,noreferrer");
  };

  const removeLink = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkInputValue("");
    setIsLinkPanelOpen(false);
  };

  return (
    <div
      className={cn(
        "border-accent-300 bg-primary-0 flex w-full flex-col rounded-lg border",
        className,
      )}
    >
      <div
        ref={menuRef}
        className="border-accent-300 bg-primary-50 flex flex-wrap items-center gap-1 rounded-t-lg border-b p-2"
      >
        <ToolbarButton
          icon={MdUndo}
          title="Undo"
          disabled={disableActions || !uiState.canUndo}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          icon={MdRedo}
          title="Redo"
          disabled={disableActions || !uiState.canRedo}
          onClick={() => editor.chain().focus().redo().run()}
        />

        <div className="bg-primary-300 mx-1 h-6 w-px" />

        <ToolbarDropdown
          label={<HeadingLabelIcon size={16} />}
          title="Heading"
          isOpen={openMenu === "text"}
          onToggle={() =>
            setOpenMenu((prev) => (prev === "text" ? null : "text"))
          }
          isActive={Boolean(uiState.headingLevel)}
          disabled={disableActions}
        >
          {HEADING_LEVELS.map((level) => (
            <DropdownItem
              key={level}
              label={`Heading ${level}`}
              icon={HEADING_ICON_MAP[level]}
              isActive={uiState.headingLevel === level}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level }).run();
                setOpenMenu(null);
              }}
            />
          ))}
        </ToolbarDropdown>

        <ToolbarDropdown
          label={<ListLabelIcon size={16} />}
          title="List"
          isOpen={openMenu === "list"}
          onToggle={() =>
            setOpenMenu((prev) => (prev === "list" ? null : "list"))
          }
          isActive={uiState.isBulletList || uiState.isOrderedList}
          disabled={disableActions}
        >
          <DropdownItem
            label="Bullet list"
            icon={MdFormatListBulleted}
            isActive={uiState.isBulletList}
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
              setOpenMenu(null);
            }}
          />
          <DropdownItem
            label="Ordered list"
            icon={GoListOrdered}
            isActive={uiState.isOrderedList}
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
              setOpenMenu(null);
            }}
          />
        </ToolbarDropdown>

        <div className="bg-primary-300 mx-1 h-6 w-px" />

        <ToolbarButton
          icon={MdFormatBold}
          title="Bold"
          isActive={uiState.isBold}
          disabled={disableActions}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={MdFormatItalic}
          title="Italic"
          isActive={uiState.isItalic}
          disabled={disableActions}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={MdFormatUnderlined}
          title="Underline"
          isActive={uiState.isUnderline}
          disabled={disableActions}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <div className="relative">
          <ToolbarButton
            icon={MdLink}
            title="Link"
            isActive={uiState.isLink || isLinkPanelOpen}
            disabled={disableActions}
            onClick={() => {
              setIsLinkPanelOpen((prev) => !prev);
              setOpenMenu(null);
              if (!isLinkPanelOpen) {
                setLinkInputValue(uiState.linkHref || "");
              }
            }}
          />

          <div
            className={cn(
              "bg-primary-0 border-primary-300 absolute top-[110%] left-1/2 z-50 flex w-[22rem] -translate-x-1/2 items-center gap-2 rounded-lg border p-2 shadow-xl transition-all duration-150",
              isLinkPanelOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0",
            )}
          >
            <input
              ref={linkInputRef}
              type="text"
              value={linkInputValue}
              placeholder="Paste a link..."
              onChange={(e) => setLinkInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyLink()}
              className="border-primary-300 bg-primary-50 text-primary-900 focus:ring-accent-300 h-9 flex-1 rounded-md border px-3 text-sm focus:ring-1 focus:outline-none"
              disabled={disableActions}
            />

            <div className="flex items-center gap-1">
              <ToolbarButton
                icon={MdOutlineSubdirectoryArrowLeft}
                title="Apply link"
                disabled={disableActions || !linkInputValue.trim()}
                onClick={applyLink}
              />
              <ToolbarButton
                icon={MdOpenInNew}
                title="Open link"
                disabled={disableActions || !linkInputValue.trim()}
                onClick={openLinkInNewTab}
              />
              <ToolbarButton
                icon={MdDeleteOutline}
                title="Remove link"
                disabled={disableActions || !uiState.isLink}
                onClick={removeLink}
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-300 mx-1 h-6 w-px" />

        <ToolbarButton
          icon={MdFormatQuote}
          title="Blockquote"
          isActive={uiState.isBlockquote}
          disabled={disableActions}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          icon={MdCode}
          title="Code block"
          isActive={uiState.isCodeBlock}
          disabled={disableActions}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />

        <div className="flex-grow" />

        <ToolbarButton
          icon={MdFormatAlignLeft}
          title="Align left"
          isActive={uiState.textAlign === "left"}
          disabled={disableActions}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <ToolbarButton
          icon={MdFormatAlignCenter}
          title="Align center"
          isActive={uiState.textAlign === "center"}
          disabled={disableActions}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <ToolbarButton
          icon={MdFormatAlignRight}
          title="Align right"
          isActive={uiState.textAlign === "right"}
          disabled={disableActions}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
        <ToolbarButton
          icon={MdFormatAlignJustify}
          title="Align justify"
          isActive={uiState.textAlign === "justify"}
          disabled={disableActions}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        />
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm text-primary-900 px-4 py-3",
            "prose-headings:text-primary-900 prose-p:text-primary-900 prose-li:text-primary-900 prose-strong:text-primary-900 prose-em:text-primary-900",
            "prose-a:text-accent-700 prose-a:no-underline hover:prose-a:underline",
            "prose-blockquote:not-italic",
            "[&_.ProseMirror]:text-primary-900 [&_.ProseMirror]:min-h-[inherit] [&_.ProseMirror]:outline-none",
            "[&_.ProseMirror_>*]:text-primary-900 [&_.ProseMirror_>*:first-child]:mt-0",
            "[&_.ProseMirror_a]:pointer-events-none [&_.ProseMirror_a]:cursor-text!",
            "[&_.ProseMirror_blockquote]:border-primary-300 [&_.ProseMirror_blockquote]:text-primary-700 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:pl-3",
            "[&_.ProseMirror_pre]:bg-primary-800 [&_.ProseMirror_pre]:text-primary-50",
            "[&_blockquote_p::after]:content-none [&_blockquote_p::before]:content-none",
            minHeightClass,
          )}
        />
      </div>
    </div>
  );
}
