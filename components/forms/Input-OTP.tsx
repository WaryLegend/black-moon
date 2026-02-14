"use client";

import * as React from "react";
import { OTPInput, OTPInputContext, OTPInputProps } from "input-otp";
import { BsDot } from "react-icons/bs";
import { cn } from "@/lib/utils/cn";

// ───────────────── InputOTP ─────────────────
type InputOTPProps = OTPInputProps & {
  containerClassName?: string;
};
const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  function InputOTPBase({ className, containerClassName, ...props }, ref) {
    return (
      <OTPInput
        ref={ref}
        containerClassName={cn(
          "flex items-center gap-2 has-[:disabled]:opacity-50",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    );
  },
);
InputOTP.displayName = "InputOTP";

// ───────────────── InputOTPGroup ────────────
type InputOTPGroupProps = React.HTMLAttributes<HTMLDivElement>;

const InputOTPGroup = React.forwardRef<HTMLDivElement, InputOTPGroupProps>(
  function InputOTPGroupBase({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      />
    );
  },
);
InputOTPGroup.displayName = "InputOTPGroup";

// ───────────────── InputOTPSlot ─────────────
type InputOTPSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number;
};
const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  function InputOTPSlotBase({ index, className, ...props }, ref) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        className={cn(
          "border-input relative flex h-10 w-10 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "ring-accent-600 ring-offset-background z-10 ring-2",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

// ──────────────── InputOTPSeparator ─────────
type InputOTPSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
>(function InputOTPSeparatorBase(props, ref) {
  return (
    <div ref={ref} role="separator" {...props}>
      <BsDot />
    </div>
  );
});
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
