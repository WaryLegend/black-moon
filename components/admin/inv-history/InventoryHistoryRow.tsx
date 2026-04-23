"use client";

import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import styled from "styled-components";

import { fDateTime } from "@/utils/date";
import type { InventoryHistorySummary } from "@/types/inventory-history";

import InventoryHistoryDetails from "./InventoryHistoryDetails";
import InventoryHistoryActor from "./InventoryHistoryActor";
import { capitalizeFirst } from "@/utils/capitalize";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

type InventoryHistoryRowProps = {
  history: InventoryHistorySummary;
};

export default function InventoryHistoryRow({
  history,
}: InventoryHistoryRowProps) {
  const {
    id,
    productVariant,
    orderId,
    quantityAfterChange,
    changeInQuantity,
    typeOfChange,
    timestamp,
    createdByUser,
  } = history;

  const oldQty = quantityAfterChange - changeInQuantity;
  const change =
    changeInQuantity > 0 ? `+${changeInQuantity}` : String(changeInQuantity);

  return (
    <Modal>
      <Table.Row>
        <Modal.Open opens={`inv-history-${id}`}>
          <Field
            className="text-accent-600 hover:text-accent-700 cursor-pointer truncate hover:underline"
            title="View details"
          >
            #{id}
          </Field>
        </Modal.Open>
        <Field>{productVariant?.sku ?? "−"}</Field>
        <Field>{orderId ?? "−"}</Field>
        <Field>{oldQty}</Field>
        <Field className="text-accent-600">
          {quantityAfterChange}{" "}
          <span
            className={
              changeInQuantity > 0
                ? "font-semibold text-green-600"
                : changeInQuantity < 0
                  ? "font-semibold text-red-600"
                  : "text-primary-600"
            }
          >
            ({change})
          </span>
        </Field>
        <Field className="text-primary-700 italic">
          {capitalizeFirst(typeOfChange?.replace("_", " ")) ?? "−"}
        </Field>
        <div className="text-primary-400 font-extralight">
          {fDateTime(timestamp)}
        </div>
        <InventoryHistoryActor user={createdByUser} />
      </Table.Row>

      <Modal.Window name={`inv-history-${id}`}>
        <InventoryHistoryDetails history={history} />
      </Modal.Window>
    </Modal>
  );
}
