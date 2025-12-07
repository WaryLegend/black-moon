"use client";

import { createContext, useContext } from "react";

const TableContext = createContext();

export default function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        role="table"
        className="border-primary-300 bg-primary-50 w-full overflow-x-auto rounded-lg border"
      >
        <div className="inline-block min-w-full align-middle">{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <div
      role="rowheader"
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
      className="text-primary-700 [&:not(:last-child)]:border-primary-300 even:bg-primary-100/50 grid items-center gap-x-6 px-6 py-3 [&:not(:last-child)]:border-b"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Skeleton({ count = 2 }) {
  const { columns } = useContext(TableContext);
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Table.Row key={index}>
          {[...Array(columns.split(" ").length)].map((_, cellIndex) => (
            <div
              className="bg-primary-200 h-5 animate-pulse rounded"
              key={cellIndex}
            ></div>
          ))}
        </Table.Row>
      ))}
    </>
  );
}

function Body({ isLoading, skeletonCount, data, render }) {
  if (isLoading) {
    return <Skeleton count={skeletonCount} />;
  }

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
