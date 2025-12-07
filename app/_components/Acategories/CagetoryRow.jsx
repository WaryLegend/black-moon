import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Image from "next/image";
import styled from "styled-components";
import Table from "@/app/_components/Table";
import Modal from "@/app/_components/Modal";
import Menus from "@/app/_components/Menus";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import { groupLabels } from "@/app/_utils/constants";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

function CategoryRow({ category }) {
  const { id: categoryId, name, group, image } = category;
  const groupDisplay = groupLabels[group] ?? group;

  function handleDuplicate() {
    createCategory({
      id: crypto.randomUUID(),
      name: `Copy of ${name}`,
      group,
      image,
    });
  }

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
      <Field>{groupDisplay}</Field>
      <AllButtons>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={categoryId} />
            <Menus.List id={categoryId}>
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
              {/* <CreateCabinForm cabinToEdit={category} /> */}
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={category.name}
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(categoryId)}
                onConfirm={() => alert("Mimic xóa thành công")}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </AllButtons>
    </Table.Row>
  );
}

export default CategoryRow;
