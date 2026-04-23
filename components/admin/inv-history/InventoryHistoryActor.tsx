"use client";

import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/utils/cn";
import type { Placement } from "@floating-ui/react";

import { getRoleStyle } from "@/utils/constants";
import type { InventoryHistorySummary } from "@/types/inventory-history";

type ActorUser = InventoryHistorySummary["createdByUser"];

type InventoryHistoryActorProps = {
  user: ActorUser;
  className?: string;
  tooltipPosition?: Placement;
};

function getRoleInitial(role?: string | null) {
  if (!role) return "";
  return role.charAt(0).toUpperCase();
}

function getDisplayName(user: ActorUser) {
  if (!user) return "-";
  const firstName = user.firstName?.trim();
  if (firstName) return firstName;

  const fullName = user.fullName?.trim();
  if (fullName) return fullName;

  return user.email;
}

function getFullName(user: ActorUser) {
  if (!user) return "-";
  return user.fullName?.trim() || user.email;
}

export default function InventoryHistoryActor({
  user,
  className,
  tooltipPosition = "top",
}: InventoryHistoryActorProps) {
  if (!user) {
    return <span className={cn("text-primary-600", className)}>-</span>;
  }

  const roleName = user.role?.trim() || "-";

  return (
    <Tooltip
      position={tooltipPosition}
      content={
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-3 whitespace-nowrap">
            <span className="font-semibold">{getFullName(user)}</span>
            {user.role ? (
              <span
                className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-xs ${getRoleStyle(user.role)}`}
              >
                {roleName}
              </span>
            ) : null}
          </div>
          <div className="text-primary-200 whitespace-nowrap">{user.email}</div>
        </div>
      }
    >
      <span className={cn("inline-flex items-center gap-2", className)}>
        <span className="font-semibold">{getDisplayName(user)}</span>
        {user.role ? (
          <span
            className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-xs ${getRoleStyle(user.role)}`}
          >
            {getRoleInitial(user.role)}
          </span>
        ) : null}
      </span>
    </Tooltip>
  );
}
