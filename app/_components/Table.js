"use client";

import { createContext, useContext } from "react";

const TableContext = createContext();

export default function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border-primary-300 bg-primary-50 w-full overflow-hidden rounded-lg border"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      className="border-primary-300 bg-primary-0 text-primary-800 grid items-center gap-x-6 border-b px-6 py-4 text-sm font-bold tracking-wide uppercase"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="row"
      className="text-primary-700 [&:not(:last-child)]:border-primary-300 grid items-center gap-x-6 px-6 py-3 [&:not(:last-child)]:border-b"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data?.length)
    return (
      <div role="row" className="text-primary-600 px-6 py-8 text-center">
        No data found.
      </div>
    );

  return <div>{data.map(render)}</div>;
}

function Footer({ children }) {
  return (
    <div className="bg-primary-0 flex justify-center px-6 py-4 [&:not(:has(*))]:hidden">
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
