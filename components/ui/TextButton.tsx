"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";
import type { LinkProps } from "next/link";
import { cn } from "@/utils/cn";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = {
  href: string;
  linkTo?: never;
  onClick?: never;
} & Omit<LinkProps, "href">;

type RelativeLinkButtonProps = {
  linkTo: string;
  href?: never;
  onClick?: never;
} & Omit<LinkProps, "href">;

type ActionButtonProps = {
  onClick?: () => void;
  href?: never;
  linkTo?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type TextButtonProps = BaseProps &
  (LinkButtonProps | RelativeLinkButtonProps | ActionButtonProps);

export default function TextButton(props: TextButtonProps) {
  const pathname = usePathname();
  const { children, className = "", ...rest } = props;

  const baseClass = cn("text-blue-700", className);

  if ("href" in props && props.href) {
    // Absolute link
    const { href, ...linkProps } = rest as LinkButtonProps;
    return (
      <Link href={href} className={baseClass} {...linkProps}>
        {children}
      </Link>
    );
  }

  if ("linkTo" in props && props.linkTo) {
    // Relative link
    const { linkTo, ...linkProps } = rest as RelativeLinkButtonProps;
    return (
      <Link href={`${pathname}/${linkTo}`} className={baseClass} {...linkProps}>
        {children}
      </Link>
    );
  }

  // Action button
  const { onClick, ...buttonProps } = rest as ActionButtonProps;
  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClass}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
