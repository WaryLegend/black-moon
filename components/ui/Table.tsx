"use client";

import { createContext, useContext } from "react";

// creating context
type TableContextValue = {
  columns: string;
};
const TableContext = createContext<TableContextValue | null>(null);

function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within <Table>");
  }
  return context;
}

// Start creating compound components
// Table
type TableProps = {
  columns: string;
  children: React.ReactNode;
};
export default function Table({ columns, children }: TableProps) {
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

//Header
function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useTableContext();

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

//Row
type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function Row({ children, className = "", ...props }: RowProps) {
  const { columns } = useTableContext();

  return (
    <div
      {...props}
      role="row"
      className={`text-primary-700 [&:not(:last-child)]:border-primary-300 even:bg-primary-100/50 grid items-center gap-x-6 px-6 py-3 [&:not(:last-child)]:border-b ${className}`}
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

// Loader
function SkeletonLoader({ row_count = 2 }) {
  const { columns } = useTableContext();
  return (
    <>
      {[...Array(row_count)].map((_, index) => (
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

// Table Body
type BodyProps<T> = {
  isLoading?: boolean;
  row_count?: number;
  data?: T[];
  render: (item: T, index: number) => React.ReactNode;
};
function Body<T>({ isLoading, row_count, data, render }: BodyProps<T>) {
  if (isLoading) {
    return <SkeletonLoader row_count={row_count} />;
  }

  if (!data?.length)
    return (
      <div role="row" className="text-primary-600 px-6 py-8 text-center">
        No data found.
      </div>
    );

  return <div>{data.map(render)}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
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
