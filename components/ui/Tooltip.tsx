"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";

import { cn } from "@/utils/cn";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  position?: Placement;
};

export default function Tooltip({
  content,
  children,
  className,
  contentClassName,
  disabled = false,
  position = "bottom",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: position,
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 10 }),
      arrow({ element: arrowRef }),
    ],
  });

  const hover = useHover(context, {
    enabled: !disabled,
    move: true,
    // restMs allows a short grace period for the pointer to move
    // from the reference into the floating element
    restMs: 50,
    delay: { open: 80, close: 150 },
    handleClose: safePolygon(),
  });
  const focus = useFocus(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={cn("inline-flex", className)}
      >
        {children}
      </div>

      {!disabled && open ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps({
              onPointerDown: (event) => {
                event.stopPropagation();
              },
              onClick: (event) => {
                event.stopPropagation();
              },
            })}
            className={cn(
              "bg-primary-800 text-primary-0 pointer-events-auto z-[9999] rounded-md px-3 py-2 text-xs shadow-lg",
              contentClassName,
            )}
          >
            {content}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={10}
              height={6}
              fill="var(--color-primary-800)"
            />
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
}
