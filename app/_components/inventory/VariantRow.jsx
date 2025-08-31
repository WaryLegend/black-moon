import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "@/app/_utils/helpers";
import Table from "@/app/_components/Table";
import styled from "styled-components";
import Modal from "@/app/_components/Modal";
import Menus from "@/app/_components/Menus";
import ConfirmDelete from "@/app/_components/ConfirmDelete";

const Img = styled.img`
  display: block;
  width: 3.5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 2px;
  object-position: center;
  /* transform: scale(1.5) translateX(-7px); */
  transform: scale(1.5);
`;

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-600);
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

  const colotText = {
    BLACK: "text-black",
    WHITE: "text-white bg-primary-700 border border-",
    BLUE: "text-blue-800",
    GREEN: "text-green-700",
    BROWN: "text-amber-900",
    PINK: "text-pink-600",
    ORANGE: "text-orange-600",
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Field>{name}</Field>
      <Field>
        <p className={colotText[color]}>{color}</p>
      </Field>
      <Field>{size}</Field>
      <Field>{quantity}</Field>
      <Price>{formatCurrency(price)}</Price>
      <AllButtons>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={productId} />
            <Menus.List id={productId}>
              {/* duplicate btn */}
              <Menus.Button
                icon={<HiSquare2Stack />}
                // onClick={handleDuplicate}
                onClick={() => alert("Copy thành công")}
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
                resourceName={variant.name}
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
