"use client";

import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid var(--color-primary-200);
  font-size: 1rem;
  background-color: var(--color-primary-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.tr`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 0.8rem 1.8rem;
  text-align: left;
  background-color: var(--color-primary-50);
  border-bottom: 1px solid var(--color-primary-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 650;
  font-size: 1rem;
  color: var(--color-primary-700);
`;

const StyledRow = styled(CommonRow)`
  padding: 0.8rem 1.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-primary-100);
  }
`;

const StyledBody = styled.tbody`
  padding: 0.4rem 0;
`;

const Footer = styled.tfoot`
  background-color: var(--color-primary-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.td`
  font-size: 1.2rem;
  color: var(--color-primary-600);
  text-align: center;
  padding: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children, className }) {
  const { columns } = useContext(TableContext);
  return (
    <thead>
      <StyledHeader $columns={columns} className={className}>
        {children}
      </StyledHeader>
    </thead>
  );
}
function Row({ children, className }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow $columns={columns} className={className}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (!data?.length)
    return (
      <StyledBody>
        <tr>
          <Empty>No data found.</Empty>
        </tr>
      </StyledBody>
    );
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
