import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import {
  formatCurrency,
  getQuantityTextColor,
  getTextColor,
} from "@/app/_utils/helpers";
import Image from "next/image";
import Table from "@/app/_components/Table";
import styled from "styled-components";
import Modal from "@/app/_components/Modal";
import Menus from "@/app/_components/Menus";
import ConfirmDelete from "@/app/_components/ConfirmDelete";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: "Sono";
`;

const Size = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent-600);
  font-family: "Sono";
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
        <p
          style={{
            ...getTextColor(color?.id).style,
          }}
          className="inline rounded-sm px-1 py-0.5 uppercase"
        >
          {color?.label}
        </p>
      </Field>
      <Size>{size?.label}</Size>
      <Price>{formatCurrency(variantPrice)}</Price>
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
