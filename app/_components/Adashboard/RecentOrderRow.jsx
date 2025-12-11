import Table from "@/app/_components/Table";
import styled from "styled-components";
import { ORDER_STATUS } from "@/app/_utils/constants";
import { formatCurrency } from "@/app/_utils/helpers";

const Field = styled.div`
  font-weight: 500; //medium
`;

function RecentOrderRow({ order }) {
  const { id, user, status, totalAmount } = order;
  return (
    <Table.Row>
      <Field>{id}</Field>
      <Field className="text-primary-700 font-normal">
        <a className="hover:text-accent-600 hover:underline">{user.userName}</a>
      </Field>
      <Field>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs ${ORDER_STATUS[order.status]?.color || "bg-primary-100 text-primary-800"}`}
        >
          {ORDER_STATUS[status]?.label || status}
        </span>
      </Field>
      <Field>{formatCurrency(totalAmount)}</Field>
    </Table.Row>
  );
}

export default RecentOrderRow;
