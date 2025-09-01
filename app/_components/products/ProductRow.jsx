import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "@/app/_utils/helpers";
import Table from "@/app/_components/Table";
import styled from "styled-components";
import Modal from "@/app/_components/Modal";
import Menus from "@/app/_components/Menus";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import Image from "next/image";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
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

function ProductRow({ product }) {
  const {
    id: productId,
    name,
    description,
    basePrice,
    category,
    image,
  } = product;

  function handleDuplicate() {
    createProduct({
      id: crypto.randomUUID(),
      name: `Copy of ${name}`,
      description,
      basePrice,
      category,
      image,
    });
  }

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
        <Price>{formatCurrency(basePrice)}</Price>
      </td>
      <td>
        <Field>{category}</Field>
      </td>
      <td>
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
                {/* <CreateCabinForm cabinToEdit={product} /> */}
              </Modal.Window>
              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={product.name}
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

export default ProductRow;
