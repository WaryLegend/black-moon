import { HiPencil } from "react-icons/hi2";
import Image from "next/image";
import styled from "styled-components";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import { CategorySummary } from "@/types/categories";
import EditCategoryForm from "./EditCategoryForm";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

type CategoryRowProps = {
  category: CategorySummary;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
};

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

function CategoryRow({ category, isSelected, onSelect }: CategoryRowProps) {
  const {
    id: categoryId,
    name,
    slug,
    imageUrl,
    targetGroup,
    isDeleted,
  } = category;
  const groupDisplay = targetGroup?.name || "-";

  return (
    <Table.Row>
      <SelectionCheckbox
        checked={isSelected}
        onChange={onSelect}
        ariaLabel={`Select category ${name}`}
      />
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`image of ${name}`}
          width={40}
          height={40}
          className="block h-10 w-14 rounded-sm object-cover"
        />
      ) : (
        <div className="bg-primary-200 h-10 w-14 rounded-sm" />
      )}
      <Field>{name}</Field>
      <Field>{slug}</Field>
      <Field>{groupDisplay}</Field>
      <Field className="flex items-center">
        <StatusDot $isDeleted={Boolean(isDeleted)} />
      </Field>
      <Menus>
        <AllButtons>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={categoryId} />
              <Menus.List id={categoryId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <EditCategoryForm categoryToEdit={category} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </AllButtons>
      </Menus>
    </Table.Row>
  );
}

export default CategoryRow;
