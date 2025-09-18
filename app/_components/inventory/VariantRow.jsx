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
  font-family: "Sono";
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
  const { id: productId, name, color, size, quantity, price, image } = variant;

  return (
    <Table.Row className="text-primary-600">
      <td>
        <Image
          src={image}
          alt={`image of ${name}`}
          width={50}
          height={40}
          className="block aspect-[3/2] max-w-[2rem] scale-150 rounded-xs object-cover object-center lg:max-w-[3.5rem]"
        />
      </td>
      <td>
        <Field>{name}</Field>
      </td>
      <td>
        <Field>
          <p
            style={{
              ...getTextColor(color).style,
              ...(color.toLowerCase() === "black" && { color: "white" }),
            }}
            className="inline rounded-sm px-1 py-0.5 uppercase"
          >
            {color}
          </p>
        </Field>
      </td>
      <td>
        <Size>{size}</Size>
      </td>
      <td>
        <Field style={{ color: getQuantityTextColor(quantity) }}>
          {quantity}
        </Field>
      </td>
      <td>
        <Price>{formatCurrency(price)}</Price>
      </td>
      <td>
        <AllButtons>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={`${productId}-${color}-${size}`} />
              <Menus.List id={`${productId}-${color}-${size}`}>
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
      </td>
    </Table.Row>
  );
}

export default VariantRow;
