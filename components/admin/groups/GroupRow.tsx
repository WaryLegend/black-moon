import { HiPencil } from "react-icons/hi2";
import Link from "next/link";
import styled from "styled-components";

import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import Menus from "@/components/ui/Menus";
import SelectionCheckbox from "@/components/ui/SelectionCheckbox";
import type { TargetGroupSummary } from "@/types/groups";

import CreateGroupForm from "./CreateGroupForm.tsx";

const Field = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const AllButtons = styled.div`
  display: flex;
  gap: 5px;
`;

type GroupRowProps = {
  group: TargetGroupSummary;
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

function GroupRow({ group, isSelected, onSelect }: GroupRowProps) {
  const { id: groupId, name, slug, isDeleted = false } = group;

  return (
    <Table.Row>
      <SelectionCheckbox
        checked={isSelected}
        onChange={onSelect}
        ariaLabel={`Select group ${name}`}
      />
      <Field>{name}</Field>
      <Field>
        <Link
          href={`/admin/catalog/categories?groups=${encodeURIComponent(slug)}`}
          className="text-accent-600 hover:text-accent-700 underline-offset-2 hover:underline"
        >
          {slug}
        </Link>
      </Field>
      <Field className="flex items-center">
        <StatusDot $isDeleted={Boolean(isDeleted)} />
      </Field>
      <Menus>
        <AllButtons>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={groupId} />
              <Menus.List id={groupId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="edit">
                <CreateGroupForm groupToEdit={group} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </AllButtons>
      </Menus>
    </Table.Row>
  );
}

export default GroupRow;
