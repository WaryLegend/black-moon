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

const Name = styled.div`
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

const Category = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary-600);
  font-family: "Sono";
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

function ProductRow({ product }) {
  const { id: productId, name, description, price, category, image } = product;

  return (
    <Table.Row>
      <Img src={image} />
      <Name>{name}</Name>
      <Price>{formatCurrency(price)}</Price>
      <Category>{category}</Category>
      <AllButtons>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={productId} />
            <Menus.List id={productId}>
              {/* duplicate btn */}
              <Menus.Button
                icon={<HiSquare2Stack />}
                // onClick={handleDuplicate}
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
              {/* <CreateCabinForm cabinToEdit={product} /> */}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={`product ${product.name}`}
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(productId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </AllButtons>
    </Table.Row>
  );
}

export default ProductRow;
