import { HiPencil } from "react-icons/hi2";
import Image from "next/image";
import styled from "styled-components";

import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import type { ProductSummary } from "@/types/products";
import Link from "next/link";

import EditProductForm from "./EditProductForm";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
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

type ProductRowProps = {
  product: ProductSummary;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
};

function ProductRow({ product, isSelected, onSelect }: ProductRowProps) {
  const firstImage = product.images?.[0]?.imageUrl;

  return (
    <Table.Row>
      <div>
        <SelectionCheckbox
          checked={isSelected}
          onChange={onSelect}
          ariaLabel={`Select product ${product.name}`}
        />
      </div>

      {firstImage ? (
        <Image
          src={firstImage}
          alt={`image of ${product.name}`}
          width={56}
          height={40}
          className="block h-10 w-14 rounded-sm object-cover"
        />
      ) : (
        <div className="from-primary-200 to-primary-100 h-10 w-14 rounded-sm bg-gradient-to-tr" />
      )}

      <Field>{product.name}</Field>
      <Field>
        <Link
          href={`/admin/catalog/inventory?products=${encodeURIComponent(product.slug)}`}
          className="text-accent-600 hover:text-accent-700 underline-offset-2 hover:underline"
        >
          {product.slug}
        </Link>
      </Field>
      <Field>{product.category?.name || "-"}</Field>
      <Field className="flex items-center">
        <StatusDot $isDeleted={Boolean(product.isDeleted)} />
      </Field>

      <div>
        <Menus>
          <AllButtons>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={product.id} />
                <Menus.List id={product.id}>
                  <Modal.Open opens="edit">
                    <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                  </Modal.Open>
                </Menus.List>
                <Modal.Window name="edit">
                  <EditProductForm productToEdit={product} />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </AllButtons>
        </Menus>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
