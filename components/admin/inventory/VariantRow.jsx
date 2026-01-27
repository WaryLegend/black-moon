import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import {
  capitalizeFirst,
  formatCurrency,
  getQuantityTextColor,
  getTextColor,
} from "@/utils/helpers";
import Image from "next/image";
import Table from "@/components/ui/Table";
import styled from "styled-components";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import ConfirmDelete from "@/components/ui/ConfirmDelete";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

function VariantRow({ variant }) {
  const { id, sku, name, color, size, stock, variantPrice, image } = variant;

  return (
    <Table.Row>
      <Image
        src={image}
        alt={`image of ${name}`}
        width={50}
        height={40}
        className="block aspect-[3/2] max-w-[2rem] scale-150 rounded-xs object-cover object-center lg:max-w-[3.5rem]"
      />
      <Field>{name}</Field>
      <Field>
        <div
          style={{
            ...getTextColor(color?.id).style,
          }}
          className="inline rounded-sm px-2 py-1"
        >
          {capitalizeFirst(color?.label)}
        </div>
      </Field>
      <Field className="uppercase">{size?.label}</Field>
      <Field className="text-accent-600">{formatCurrency(variantPrice)}</Field>
      <Field style={{ color: getQuantityTextColor(stock) }}>{stock}</Field>
      <AllButtons>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={sku || id} />
            <Menus.List id={sku || id}>
              {/* duplicate btn */}
              <Menus.Button
                icon={<HiSquare2Stack />}
                // onClick={handleDuplicate}
                onClick={() => alert("Successfully duplicated")}
                // disabled={isCreating}
              >
                Duplicate
              </Menus.Button>
              {/* edit btn */}
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {/* delete btn */}
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="edit">
              {/* <CreateCabinForm cabinToEdit={variant} /> */}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={`${variant.name}-${variant.color} (${variant.size})`}
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(productId)}
                onConfirm={() => alert("Mimic xóa thành công")}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </AllButtons>
    </Table.Row>
  );
}

export default VariantRow;
