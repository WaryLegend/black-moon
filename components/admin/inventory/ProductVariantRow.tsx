"use client";

import Image from "next/image";
import { HiPencil } from "react-icons/hi2";
import styled from "styled-components";

import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import Table from "@/components/ui/Table";
import { formatCurrency } from "@/utils/currency";
import { getQuantityColor } from "@/utils/constants";
import { getTextColorStyle } from "@/utils/text.color";
import type { ProductVariantSummary } from "@/types/products";

import EditProductVariantForm from "./EditProductVariantForm";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const StatusDot = styled.span<{ $isDeleted: boolean }>`
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-image: ${(props) =>
    props.$isDeleted
      ? "linear-gradient(135deg, #dc2626, #fecaca)"
      : "linear-gradient(135deg, #adadad, #cfcccc)"};
`;

type ProductVariantRowProps = {
  variant: ProductVariantSummary;
  isSelected?: boolean;
  onSelect?: (checked: boolean) => void;
};

export default function ProductVariantRow({
  variant,
  isSelected,
  onSelect,
}: ProductVariantRowProps) {
  const { id, sku, color, size, price, quantity, imageUrl, isDeleted } =
    variant;

  return (
    <Table.Row>
      {onSelect ? (
        <SelectionCheckbox
          checked={isSelected || false}
          onChange={onSelect}
          ariaLabel={`Select variant ${sku}`}
        />
      ) : null}

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={sku}
          width={56}
          height={40}
          className="block h-10 w-14 rounded-sm object-cover"
        />
      ) : (
        <div className="from-primary-200 to-primary-100 h-10 w-14 rounded-sm bg-gradient-to-tr" />
      )}

      <Field>{sku}</Field>

      <Field>
        <div
          style={{
            ...(color ? getTextColorStyle(color).style : {}),
          }}
          className="inline rounded-sm px-2 py-1"
        >
          {color ?? "−"}
        </div>
      </Field>

      <Field>{size ?? "−"}</Field>
      <Field className="text-accent-600">
        {price > 0 ? formatCurrency(price) : "−"}
      </Field>
      <Field style={{ color: getQuantityColor(quantity ?? 0) }}>
        {quantity ?? 0}
      </Field>
      <Field className="flex items-center">
        <StatusDot $isDeleted={Boolean(isDeleted)} />
      </Field>

      <Menus>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens={`edit-variant-${id}`}>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name={`edit-variant-${id}`}>
              <EditProductVariantForm variant={variant} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Menus>
    </Table.Row>
  );
}
